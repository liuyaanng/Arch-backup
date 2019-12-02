(function(){
	"use strict";

	/**
	 * 只检测顶层框架页面和预加载下一页的框架页面
	 */
	var NETXPAGE_FRAME_NAME = '__reader_view_nextpage_preload__';
	if(window != parent && window.name != NETXPAGE_FRAME_NAME){
		return;
	}
	var isTopFrame  = window == parent,
		isNextPageFrame = !isTopFrame;

	/**
	* chrome版本检测
	**/
	var isChrome = navigator.userAgent.match(/Chrome\/(\d+)/),
		ChromeVersion = isChrome && parseInt(isChrome[1], 10) || 0;

	/**
	* 网页主动模式，设置了该模式则网页会主动打开阅读模式。如指定content，则使用content指定的dom作为正文
	* <meta name="readerview" content=".xxx">
	*/
	var $manual = $('head meta[name=readerview]'),
		isManual = !!$manual.length;

	/*阅读模式页面*/
	var READER_VIEW_PAGE_SRC = chrome.runtime.getURL('src/html/view.html');
	/*插件Origin*/
	var EXT_ORIGIN = chrome.runtime.getURL('').replace(/\/$/, '');

	/**
	 * ReaderView组件数据模块
	 */
	var ReaderViewData = (function(){
		var PageData         = {},
			_beforeData      = {},
			initEd           = false,
			clsName          = '__reader_view_article_wrap_' + Math.random().toString().substr(2) + '__',
			adoptableArticle = null;

		var initData = function(){
			var $article = $(adoptableArticle.outerHTML);
			/*补全绝对路径链接*/
			$article.find('a').each(function(idx, a){
				a.setAttribute('href', a.href);
				if(a.target == '' || a.target.toLowerCase() == '_self'){
					a.setAttribute('target', '_top');
				}
			});
			$article.find('img').each(function(idx, img){
				img.setAttribute('src', img.src);
			});
			return $.extend({
				article      : $article[0].outerHTML,
				url          : window.location.href,
				leadingImage : ReaderArticleFinderJS.leadingImage && ReaderArticleFinderJS.leadingImage.src,
				mainImage    : ReaderArticleFinderJS.mainImageNode() && ReaderArticleFinderJS.mainImageNode().src,
				pageNumber   : ReaderArticleFinderJS.pageNumber,
				description  : ReaderArticleFinderJS.pageDescription(),
				nextPage     : ReaderArticleFinderJS.nextPageURL(),
				title        : ReaderArticleFinderJS.articleTitle(),
				rtl          : !ReaderArticleFinderJS.articleIsLTR()
			}, PageData);
		}
		return {
			init : function(){
				if(initEd || !this.check()){
					return this;
				}
				$(ReaderArticleFinderJS.articleNode()).addClass(clsName);
				this.setData(initData());
				initEd = true;
				return this;
			},
			check : function(){
				if(adoptableArticle){
					return true;
				}
				if(!ReaderArticleFinderJS.adoptableArticle()){
					ReaderArticleFinderJS.isReaderModeAvailable();
				}
				return !!(adoptableArticle = ReaderArticleFinderJS.adoptableArticle());				
			},
			setData : function(data, value){
				if(typeof data == 'string' && typeof value != 'undefined'){
					PageData[data] = value;
				} else if(typeof data == 'object') {
					for(var key in data){
						PageData[key] = data[key];
					}
				}
				return this;
			},
			/**
			 * 获取数据，keys不传则获取所有，传单个值返回单个项，传数组返回多项
			 */
			getData : function(keys){
				if(!initEd){
					this.init();
				}
				if(!keys){
					return JSON.stringify(PageData) === '{}' ? null : PageData;
				}
				if(Array.isArray(keys)){
					var _ret = {};
					keys.forEach(function(key){
						if(PageData.hasOwnProperty(key)){
							_ret[key] = PageData[key];
						}
					});
					return _ret;
				} else if(typeof keys == 'string'){
					return PageData[keys];
				}
			},
			getMainContentCls : function(){
				return initEd && clsName || null;
			},
			getStatus : function(){
				return initEd;
			}
		}
	})();

	/**
	 * ReaderView组件Panel模块
	 */
	var ReaderViewPanel = (function(){
		var initEd       = false,
			showing      = false,
			$html        = $('html'),
			domAdded     = false,
			htmlOverflow = $html.css('overflow');

		var addWidget = function (){
			var widgetDom = document.createElement('div'),
				widgetRoot = widgetDom.createShadowRoot ? widgetDom.createShadowRoot() : widgetDom.webkitCreateShadowRoot();
			var widgetWrap = document.createElement(ChromeVersion >= 37 ? 'dialog' : 'div'),
				$widgetPage = $('<iframe src="' + READER_VIEW_PAGE_SRC + '" name="' + window.location.href + '"></iframe>');
			$widgetPage.css({
				'width'  : '100%',
				'height' : '100%',
				'border' : 'none'
			});
			$(widgetWrap).css({
				'position'   : 'fixed',
				'width'      : '100%',
				'height'     : '100%',
				'top'        : 0,
				'left'       : 0,
				'background' : 'rgb(251, 251, 251)',
				'zIndex'     : '2147483647',
				'display'    : 'block',
				'padding'    : 0,
				'border'     : 'none',
				'margin'     : 0,
			}).append($widgetPage);
			 $(widgetRoot).append($(widgetWrap));
			return $(widgetDom);
		}

		return {
			init : function(){
				if(initEd || !this.check()){
					return this;
				}
				this.widgetDom = addWidget();
				initEd = true;
				return this;
			},			
			check : function(){
				return initEd || ReaderArticleFinderJS.isReaderModeAvailable();
			},
			show : function(){
				if(!initEd){
					this.init();
				}
				if(!this.check()){
					return this;
				}
				if(!domAdded){
					$('body').append(this.widgetDom);
					domAdded = true;
				}
				this.widgetDom.css('display', 'block');
				$html.css('overflow', 'hidden');
				showing = true;
				return this;
			},
			hide : function(){
				if(!initEd){
					this.init();
				}
				if(!this.check()){
					return this;
				}
				this.widgetDom.css('display', 'none');
				$html.css('overflow', htmlOverflow);
				showing = false;
				return this;
			},
			getStatus : function(){
				return initEd;
			},
			isShow : function(){
				return showing;
			}
		}
	})();
	/**
	 * ReaderView组件
	 */

	var ReaderView = {
		panel : ReaderViewPanel,
		data : ReaderViewData,

		init : function(onlyData){
			ReaderViewData.init();
			if(!onlyData){
				ReaderViewPanel.init();
			}
			return this;
		},
		check : function(onlyData, autoInit){
			if(ReaderViewData.check() && (onlyData ? true : ReaderViewPanel.check())){
				autoInit && this.init(onlyData);
				return  true;
			}
			return false;
		},
		show : function(){
			ReaderViewPanel.show();
			return this;
		},
		hide : function(){
			ReaderViewPanel.hide();
			return this;
		},
		setData : function(data, value){
			ReaderViewData.setData(data, value);
			return this;
		},
		getData : function(key){
			return ReaderViewData.getData(key);
		},
		send2Panel : function(type, data){
			var target = isTopFrame ? frames[window.location.href] : parent;
			target && WindowMessage.send(target, type, data, EXT_ORIGIN);
			return this;
		}
	};

	/*初始化插件*/
	var readerViewInit = function(){
		var onlyData = !!isNextPageFrame;
		/*网页自主设置可阅读文本块情况*/
		if(isManual){
			var manualReadableDom = $($manual.attr('content')),
				manualReadableDom = manualReadableDom.length && manualReadableDom[0];
			if(manualReadableDom){
				ReaderArticleFinderJS.findArticleBySearchingWhitelist = function(){
					return new CandidateElement(manualReadableDom, document);
				}
			}
		}
		if(ReaderView.check(onlyData)){
			ReaderView.init(onlyData);
			if(isTopFrame){
				Message.send('readerInit');
			} else {
				ReaderView.send2Panel('data', ReaderView.getData());
			}
			return true;
		} else if(isNextPageFrame){
			ReaderView.send2Panel('lastPageEnd');
			return true;
		} else {
			return false;
		}
	};

	/*插件事件*/
	var extEvents = function(){
		/*展示阅读模式*/
		Message.on('rvActive', function(){
			ReaderView.show();
			return true;
		});

		/*收起阅读模式*/
		Message.on('rvInited', function(){
			ReaderView.hide();
			return true;
		});

		/*与阅读模式页面通讯*/
		WindowMessage.receive('loaded', function(data, event){
			WindowMessage.send(event.source, 'data', ReaderView.getData());
		}).receive('hidePanel', function(data, event){
			Message.send('hidePanel');
		});
	};

	/*直接网页配置直接打开阅读模式*/
	var webpageAutoRender = function(){
		if(isManual && ReaderView.check()){
			Message.send('showPanel');
		};
	};

	/*开放接口*/
	var apiCbs = [];
	var apis = {
		getPageData : function(data, sender, cb){
			cb(ReaderView.getData(data));
		},
		getMainContentClass : function(data, sender, cb){
			cb(ReaderView.data.getMainContentCls());
		}
	}
	for(var api in apis){
		(function(api){
			var rcvName = 'rv' + api.replace(/^(\w)/, function($0, $1){return $1.toUpperCase()});
			Message.on(rcvName, function(data, sender, cb){
				if(apiCbs){
					apiCbs.push([apis[api], [data, sender, cb]]);
				} else {
					apis[api](data, sender, cb);
				}
				return true;
			});
		})(api);
	}

	/*检测完成之后进行操作*/
	new Promise(function(resolve, reject){
		/*Dom加载完判断页面是否可支持阅读模式，如不行则监听Dom变化后是否可支持阅读模式*/
		$(function(){
			/*10秒钟之后还未检测出页面可支持阅读模式则退出检测*/
			var t = setTimeout(function(){
				resolve();
			}, 10000);
			if(!readerViewInit()){
				var observer = new MutationObserver(function(){
					if(readerViewInit()){
						clearTimeout(t);
						resolve();
						observer.disconnect();
						observer.takeRecords();
					}
				});
				observer.observe(document, {
					characterData : true,
					subtree       : true,
					childList     : true
				});
			} else {
				clearTimeout(t);
				resolve();
			}
		});
	}).then(function(){
		if(isTopFrame){
			webpageAutoRender();
			extEvents();
		}
		
		/*因为无法确定外部插件调用时是否在页面检测之前，保证外部接口的调用需要等检测完成之后返回*/
		apiCbs.forEach(function(api){
			api[0].apply(apis, api[1]);
		});
		apiCbs = null;
	});

	Message.on('rvIsTabOpened', function(data, sender, cb){
		cb(true);
	});
})();