var vendor = 'ChromeStore';
var server = document.location.protocol + '//note.youdao.com';
var timer = null;
var count = 0;

function log () {
    var i = new Image();
    i.src = server + '/yws/mapi/ilogrpt?method=putwcplog&chrome_clipper=install&vendor='+ vendor;
    return true;
}

function onInstall() {
    console.log("Extension Installed");
    log();
    try{
        chrome.tabs.reload(null, {
                bypassCache: true
            });
    } catch (e) {
            chrome.tabs.getSelected(null, function(tab) {
                    var currentURL = tab.url;
                    if(currentURL) {
                        chrome.tabs.update(tab.id, {url: currentURL});
                    }
                });
    }
    chrome.tabs.create({
        url: 'http://note.youdao.com/help/extensionguide.html?auto=1',
        selected: true
    });
}

function onUpdate() {
    console.log("Extension Updated");
}

function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version'];
if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
      onInstall();
    } else {
      onUpdate();
    }
    chrome.browserAction.setIcon({path: "assets/init_19x19.png"});
    localStorage['version'] = currVersion;
}


//gAction:          动作的类型
//gActionOption:    动作所带的参数
var gAciton = null;
var gActionOption = {};

gActionOption.version = getVersion();

chrome.contextMenus.create({
    title: chrome.i18n.getMessage('pageMenu'),
    contexts: ['page'],
    onclick: function(info, tab) {
        count = 0;
        startClip(tab.id, 'm_clipperPage');
    }
});

chrome.contextMenus.create({
    title: chrome.i18n.getMessage('selectionMenu'),
    contexts: ['selection'],
    onclick: function(info, tab) {
        count = 0;
        startClip(tab.id, 'm_clipperSelection');
    }
});

chrome.contextMenus.create({
    title: chrome.i18n.getMessage('clipperImageMenu'),
    contexts: ['image'],
    onclick: function(info, tab){
        count = 0;
        gActionOption.imgSrc = info.srcUrl;
        gActionOption.title = tab.title;
        startClip(tab.id, 'm_clipperImage');
    }
});


chrome.browserAction.onClicked.addListener(function(tab) {
    // Check if is first click;
    var firstClick = localStorage['changeLogo'];
    if(typeof firstClick === 'undefined'){
        chrome.browserAction.setIcon({path: "assets/logo_19x19.png"});
        localStorage['changeLogo'] = JSON.stringify(false);
    }
    else if(JSON.parse(firstClick)){
        chrome.browserAction.setIcon({path: "assets/logo_19x19.png"});
        localStorage['changeLogo'] = JSON.stringify(false);
    }

    chrome.tabs.executeScript(tab.id, {file: "js/clipper-min.js"});

    count = 0;
    startClip(tab.id, 'browser');
});

//统计心跳用户
var heartbeatDate = new Date();
var currHeartbeatDate = heartbeatDate.toDateString();
var prevHeartbeatDate = localStorage['heartbeatDate'];
if(currHeartbeatDate !== prevHeartbeatDate){
    //发送消息给服务器
    var i = new Image();
    i.src = server + '/yws/mapi/ilogrpt?method=putwcplog&chrome_status=heartbeat&version=' + getVersion();
    localStorage['heartbeatDate'] = currHeartbeatDate;
}

chrome.extension.onRequest.addListener(function (msg) {
    var tabId = msg.id;
    if (msg.result === 'isNotInsert') {
        chrome.tabs.executeScript(tabId, {file: "js/clipper-min.js"}, function () {
            chrome.tabs.sendRequest(tabId, {
                action: gAction,
                option: gActionOption
            });
        });
    } else {
        count++;
        if (count < 2) {
            chrome.tabs.sendRequest(tabId, {
                action: gAction,
                option: gActionOption
            });
        }
    }
});

var startClip = function(tabId, action) {
    gAction = action;
    chrome.tabs.executeScript(tabId, {file: "js/check.js"},function () {
        chrome.tabs.sendRequest(tabId, {
            id: tabId,
            msg: 'check'
        });
    });
};
