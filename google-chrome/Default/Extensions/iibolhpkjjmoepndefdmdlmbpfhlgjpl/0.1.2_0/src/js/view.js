Config().then(function(config){
	"use strict";

	if(!parent){
		return;
	}
	var parentUrl     = window.name,
		parentOrigin  = parseUrl(parentUrl).origin,
		$body         = $('body');

	/**
	 * 阅读模式页面
	 */
	var autoLoadPages = 3;
	function Paper(theme, size, font){
		this.wrap = $('#article');
		this.pagesNum = 0;
		this.nextPage = [];
		this.firstPageTitle = '';
		this.setTheme(theme || 'sepia');
		this.setfontSize(size || 100);
		this.setFont(font || 'seravek');
		this.$nextLoadingTips = this.wrap.children().last();
	}
	/*定义可用主题名称*/
	Paper.themes = {
		'white' : 'rgb(230, 230, 230)',
		'sepia' : 'rgb(224, 216, 200)',
		'gray'  : 'rgb(50, 50, 51)',
		'night' : 'black'
	};
	/*定义可用字体*/
	Paper.fonts = {
		'system'   : '-apple-system-font',
		'heitisc'  : 'Heiti SC',
		'songtisc' : 'Songti SC',
		'kaitisc'  : 'Kaiti SC',
		'yuantisc' : 'Yuanti SC',
		'georgia'  : 'Georgia',
		'seravek'  : 'Seravek',
		'times'    : 'Times New Roman'
	};
	Paper.pageTmpl = '<div class="page"><div class="page-number"></div></div>';
	Paper.scrollListenCbs = [];
	Paper.listenScroll = (function(){
		var lisened = false,
			$document = $(document),
			$window   = $(window),
			gap       = 800,
			t           = +new Date;
		var func = function(e){
			if(+new Date - t < 50){
				return;
			}
			t = +new Date;
			if($document.scrollTop() + $window.height() + gap > $document.height()){
				Paper.scrollListenCbs.forEach(function(cb){
					cb();
				});
			}
		}
		return function(stop){
			if(stop){
				$(window).off('scroll', func);
			}
			if(lisened) {
				return;
			}
			$(window).on('scroll', func);
		}
	})();
	Paper.addTheme = function(name, color){
		if(!name || !color || Paper.themes[name]){
			return;
		}
		Paper.themes[name] = color;
	}
	Paper.addFont = function(name, font){
		if(!name || !font || Paper.fonts[name]){
			return;
		}
		Paper.fonts[name] = font;
	}
	Paper.prototype.setTitle = (function(){
		var titleSeted = false;
		return function(title){
			if(!titleSeted && title){
				document.title = title;
				titleSeted = true;
			}
			return this;
		}
	})();
	Paper.prototype.setTheme = function(theme){
		var allowThemes = Object.keys(Paper.themes);
		if(theme && allowThemes.indexOf(theme) !== -1){
			$body.removeClass(allowThemes.join(' '));
			$body.addClass(theme);
			this.theme = theme;
			config.theme = theme;
		}
		return this;
	}
	Paper.prototype.setfontSize = function(fontSize){
		if(!fontSize){
			return this;
		}
		fontSize = Math.min(200, Math.max(60, fontSize));
		this.fontSize = fontSize;
		config.fontSize = fontSize;
		$body.css('fontSize', fontSize + '%');
		return this;
	}
	Paper.prototype.setfontUp = function(){
		return this.setfontSize(this.fontSize + 10);
	}
	Paper.prototype.setfontDown = function(){
		return this.setfontSize(this.fontSize - 10);
	}
	Paper.prototype.setFont = function(fontFamily){
		var allowFont = Object.keys(Paper.fonts);
		if(allowFont && allowFont.indexOf(fontFamily) !== -1){
			$body.removeClass(allowFont.join(' '));
			$body.addClass(fontFamily);
			this.font = fontFamily;
			config.fontFamily = fontFamily;
		}
		return this;
	}
	Paper.prototype.setStyle = function(theme, fontSize, fontFamily){
		return this.setTheme(theme).setfontSize(fontSize).setFont(fontFamily);
	}
	Paper.prototype.addNextPageUrl = function(url){
		this.nextPage.push(url);
		if(this.pagesNum < autoLoadPages){
			this.loadNextPage();
		} else {
			Paper.listenScroll();
		}
	}
	Paper.prototype.loadNextPage = (function(){
		var $nextPageWrap = $('#next-page-preload'),
			$nextLoadingTips = $('#incoming-page-placeholder'),
			isPageLoading = false,
			_t;
		var _f = function(){
			var self = this;
			if(isPageLoading){
				_t = setTimeout(function(){
					_f.call(self);
				}, 500);
			} else {
				clearTimeout(_t);
				var url = this.nextPage.shift();
				if(!url){
					return;
				}
				isPageLoading = url;
				$nextLoadingTips.show();
				$nextPageWrap.attr('src', url);
			}
		}
		WindowMessage.receive('data', function(data, event){
			if(data.url == isPageLoading){
				isPageLoading = false;
				$nextLoadingTips.hide();
			}
		});
		return _f;
	})(),
	Paper.prototype.addPage = function(data){
		if(!data || !data.article){
			return this.end();
		}
		this.setTitle(data.title);
		var $page = $(Paper.pageTmpl);
		$page.find('div.page-number').text(Text('pageNum', [this.pagesNum + 1]));
		var title = data.title;
		if(title != this.firstPageTitle){
			$page.append('<h1 class="title">' + data.title + '</h1>');
		}
		if(this.pagesNum === 0){
			this.firstPageTitle = title;
		} else {
			this.wrap.addClass('show-pn');
		}
		var $article = $(data.article);
		if(!$article.find('.leading-image').length && data.leadingImage){
			$('<div class="leading-image"><img src="' + data.leadingImage + '"></div>').insertBefore($article.children().first());
		}
		$page.append($article);
		if(data.nextPage){
			this.addNextPageUrl(data.nextPage);
		} else {
			this.end();
		}
		if(data.rtl){
			$page.addClass('rtl');
		}
		$page.insertBefore(this.$nextLoadingTips);
		this.pagesNum++;
		return this;
	};
	Paper.prototype.end = function(){
		if(!this.nextPage.length){
			Paper.listenScroll(true);
			this.$nextLoadingTips.hide();
		}
		return this;
	}

	/**
	 * 样式设置
	 */
	var $ctrl = $('.ctrl');
	var initCtrl = function(){
		var $icon = $('.ctrl .icon'),
			$themeChooseInner = $('.theme-choose-inner'),
			$fontChooseInner = $('.font-choose-inner'),
			themes = Paper.themes,
			fonts  = Paper.fonts,
			themeHtml = [],
			fontHtml  = [];
		for(var theme in themes){
			themeHtml.push('<li class="item" data-theme="' + theme + '" title="' + theme + '"><span style="background-color:' + themes[theme] + '"></span></li>');
		}
		$themeChooseInner.html(themeHtml.join(''));
		for(var font in fonts){
			fontHtml.push('<li class="item" data-font="' + font + '" style="font-family:' + fonts[font] + '" title="' + fonts[font] + '"><span>A</span><span>字</span></li>');
		}
		$fontChooseInner.html(fontHtml.join(''));

		$ctrl.on('click', function(e){
			e.stopPropagation();
		});
		$icon.on('click', function(e){
			e.preventDefault();
			$ctrl.toggleClass('show');
		});
		$('.size-small').on('click', function(e){
			e.preventDefault();
			paper.setfontDown();
		});
		$('.size-large').on('click', function(e){
			e.preventDefault();
			paper.setfontUp();
		});

		$('.theme-choose .item').on('click', function(e){
			e.preventDefault();
			paper.setTheme($(this).data('theme'));
		});

		$('.font-choose .item').on('click', function(e){
			e.preventDefault();
			paper.setFont($(this).data('font'));
		});
	}	

	var paper = new Paper(config.theme, config.fontSize, config.fontFamily);
	/*与网页页面脚本通讯*/
	WindowMessage.receive('data', function(data, event){
		paper.addPage(data);
	});
	WindowMessage.receive('lastPageEnd', function(data, event){
		paper.end();
	});
	Paper.scrollListenCbs.push(function(){
		paper.loadNextPage();
	});

	$(function(){
		initCtrl();
		$('#article').on('click', function(e){
			e.stopPropagation();
		});
		$(document).on('click', function(e){
			if(!$ctrl.hasClass('show')){
				WindowMessage.send(parent, 'hidePanel', null, parentOrigin);
			} else {
				$ctrl.removeClass('show');
			}
		});
		WindowMessage.send(parent, 'loaded', null, parentOrigin);
	});	
});