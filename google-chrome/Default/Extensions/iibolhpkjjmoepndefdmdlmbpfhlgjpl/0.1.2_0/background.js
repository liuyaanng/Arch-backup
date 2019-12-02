(function(){
	"use strict";

	var tabs = chrome.tabs;

	var STATUS_UNINIT = 0, //页面不支持阅读模式状态
		STATUS_INITED = 1, //页面支持阅读模式，没打开阅读界面
		STATUS_ACTIVE = 2; //打开阅读界面

	/*处理插件图标状态*/
	var PageActionIcon = (function(){
		var pageAction = chrome.pageAction;
		var icons = {
			'default' : {
				'19' : 'src/img/icon19_default.png',
				'38' : 'src/img/icon38_default.png'
			},
			'active' : {
				'19' : 'src/img/icon19_active.png',
				'38' : 'src/img/icon38_active.png'
			}
		};

		function PageActionIcon(tabId){
			this.tabId  = tabId;
			this.status = STATUS_UNINIT;
			pageAction.setIcon({
				tabId : tabId,
				path  : icons.default
			});
			pageAction.show(tabId);
		}
		PageActionIcon.prototype.show = function(){
			if(this.status !== STATUS_INITED){
				pageAction.setIcon({
					tabId : this.tabId,
					path  : icons.default
				});
				pageAction.setTitle({
					tabId : this.tabId,
					title : Text('iconTips')
				});
			}
			return this;
		};
		PageActionIcon.prototype.active = function(){
			if(this.status !== STATUS_ACTIVE){
				pageAction.setIcon({
					tabId : this.tabId,
					path  : icons.active
				});
				pageAction.setTitle({
					tabId : this.tabId,
					title : Text('iconHideTips')
				});
			}
			return this;
		};
		PageActionIcon.prototype.hide = function(){
			if(this.status !== STATUS_UNINIT){
				pageAction.hide(this.tabId);
			}
			return this;
		};		
		PageActionIcon.prototype.setStatus = function(status){
			if(status === STATUS_UNINIT){
				this.hide();
			}else if(status === STATUS_INITED){
				this.show();
			}else if(status === STATUS_ACTIVE){
				this.active();
			}
			this.status = status;
			return this;
		};
		return PageActionIcon;		
	})();

	/*阅读模式处理*/
	var ReaderViews = (function(){
		/*阅读模式对象暂存表*/
		var tabs = {};

		function ReaderViews(tabId, url){
			if(!(this instanceof ReaderViews)){
				return new ReaderViews(tabId, url);
			}
			if(tabs[tabId] && tabs[tabId].url == url){
				return tabs[tabId];
			}
			this.tabId = tabId;
			this.url    = url;
			this.status = STATUS_UNINIT;
			tabs[tabId] = this;
			this.init();
		}
		ReaderViews.remove = function(tabId){
			if(tabs[tabId]){
				delete tabs[tabId];				
			}			
		}
		ReaderViews.check = function(tabId, url){
			return tabs[tabId] && tabs[tabId].url == url;
		}
		ReaderViews.prototype.triggleStatus = function(status){
			this.status = status;
			this.icon.setStatus(status);
			Message.send(this.tabId, 'rvStatus', {
				status : status
			});
			if(this.status === STATUS_INITED){
				Message.send(this.tabId, 'rvInited');
			} else if(this.status === STATUS_ACTIVE){
				Message.send(this.tabId, 'rvActive');
			}
			return this;
		}
		ReaderViews.prototype.init = function(){
			if(this.status === STATUS_INITED){
				return this;
			}
			this.icon = new PageActionIcon(this.tabId);
			this.triggleStatus(STATUS_INITED);
			return this;
		}
		ReaderViews.prototype.toggleActive = function(){
			if(this.status === STATUS_UNINIT){
				return this;
			} else if(this.status === STATUS_INITED){
				this.triggleStatus(STATUS_ACTIVE);				
			} else if(this.status === STATUS_ACTIVE){
				this.triggleStatus(STATUS_INITED);
			}
			return this;
		}
		ReaderViews.prototype.remove = function(){
			ReaderViews.remove(this.tabId);
			return this;
		}		

		return ReaderViews;
	})();

	Message.on('readerInit', function(data, sender, cb){
		ReaderViews(sender.tab.id, sender.url);
	});
	Message.on('hidePanel', function(data, sender, cb){
		ReaderViews(sender.tab.id, sender.url).triggleStatus(STATUS_INITED);
	});
	Message.on('showPanel', function(data, sender, cb){
		ReaderViews(sender.tab.id, sender.url).triggleStatus(STATUS_ACTIVE);
	});
	Message.on('togglePanel', function(data, sender, cb){
		ReaderViews(sender.tab.id, sender.url).toggleActive();
	});
	chrome.pageAction.onClicked.addListener(function(tab){		
		ReaderViews(tab.id, tab.url).toggleActive();
	});

	chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
		ReaderViews.remove(tabId);
	});
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
		if(changeInfo.status === 'loading'){
			ReaderViews.remove(tabId);
		}
	});

	/**
	* 快捷键监听
	**/
	chrome.commands.onCommand.addListener(function(command){
		if(command == 'toggle_readerview'){
			tabs.query({
				active : true, 
				currentWindow : true,
				status : 'complete'
			}, function(tabs){
				var tab = tabs && tabs.length && tabs[0];
				if(tab){
					ReaderViews(tab.id, tab.url).toggleActive();
				}
			});
		}
    });


	/**
	* 对外API处理
	*/
	/*支持外部插件调用的消息方法*/
	var apiAllowMethods = ['ping', 'getPageData', 'getMainContentClass'];
	var API = {
		ping : function(data, sender, cb){
			Message.send('rvIsTabOpened', function(err, data){
				cb('pone');
			});
			return true;
		}
	};
	var magicFunc = function(method, data, tabId, url, extId, cb){
		var pageMsgMethod = 'rv' + method.replace(/^(\w)/, function($0, $1){return $1.toUpperCase()});
		Message.send(tabId, pageMsgMethod, data).then(function(data){
			cb(data);
		}).catch(function(err){
			cb(Message.Error(err.message));
		});
	};
	apiAllowMethods.forEach(function(method){
		var type = 'ReaderView.' + method;
		Message.addApiAllowMethods(type);
		Message.on(type, function(data, sender, cb){
			if(API[method]){
				return API[method](data, sender, cb);
			} else if(sender.tab || data && data.tab) {
				var extId = sender.id;
				if(sender.tab){
					var tabId = sender.tab.id,
						url   = sender.url;
				} else {
					var tabId = data.tab.id,
						url   = data.tab.url;
				}
				magicFunc(method, data, tabId, url, extId, cb);
				return true;
			} else {
				cb(Message.Error('Sorry! for this api method you should request from a content script or add data.tab in you request data.'));
			}
		});
	});

	/*安装提示*/
	chrome.runtime.onInstalled.addListener(function(data){
		if(data.reason == 'install' || data.reason == 'update'){
		}
	});
})();