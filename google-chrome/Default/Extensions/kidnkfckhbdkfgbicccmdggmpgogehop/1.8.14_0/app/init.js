console.debug = function(){};
window.CDN = ""
//window.BACKEND = 'http://test.maxiang.info:8088'
//window.BACKEND = 'http://app.maxiang.info:8088'
window.BACKEND = chrome.i18n.getMessage('backend')
window.BACKEND_YINXIANG = chrome.i18n.getMessage('backend_yinxiang')
//window.BACKEND_IP = chrome.i18n.getMessage('backend_ip')

window.ENV = {
	chrome_app : true,
	ua: navigator.userAgent,
	version: '2015-06-26'
}
try{
window.localStorage = undefined;
}catch(e){
}
/*
window.baseDir = 'res-min';
window.require = {
    baseUrl: window.baseDir,
    deps: ['main_' + chrome.i18n.getMessage("lang")]
    };

*/
