(function(ns){
	"use strict";

	var configObjs = {
		sync    : null,
		local   : null,
		managed : null
	};

	var config = function(area){
		if(!area || !/^(sync|local|managed)$/i.test(area)){
			area = 'sync';
		}
		area = area.toLowerCase();
		if(configObjs[area]){
			return configObjs[area];
		}

		var syncObj = chrome.storage[area];

		var configObj =  new Promise(function(resolve, reject){
			var retData = function(data){
				chrome.storage.onChanged.addListener(function(changes, namespace) {
					if(namespace === area){
						for (var key in changes) {
							data[key] = changes[key].newValue;
						}
					}
				});
				resolve(data);
			}
			syncObj.get(null, function(data){
				if(Object.observe){
					Object.observe(data, function(changes){
						changes.forEach(function(change){
							syncObj.set(change.object, function(){
								var lastError = chrome.runtime.lastError;
								if(lastError){
									console.error(lastError);
									reject(lastError);
								}
							});
						});
					});
					retData(data);
				} else if(window.Proxy){
					var data2 = new Proxy(data, {
						set : function(oTarget, sKey, vValue){
							setTimeout(function(){
								syncObj.set(data2, function(){
									var lastError = chrome.runtime.lastError;
									if(lastError){
										console.error(lastError);
										reject(lastError);
									}
								});
							});
							return oTarget[sKey] = vValue;
						},
						deleteProperty : function(oTarget, sKey){
							setTimeout(function(){
								syncObj.set(data2, function(){
									var lastError = chrome.runtime.lastError;
									if(lastError){
										console.error(lastError);
										reject(lastError);
									}
								});
							});
							delete oTarget[sKey];
						}
					});
					retData(data2);
				}				
			});
		});
		configObj.set = function(k, v){
			var c = {};
			c[k] = v;
			syncObj.set(c, function(){
				if(chrome.runtime.lastError){
					console.error(chrome.runtime.lastError);
				}
			});
		}

		configObjs[area] = configObj;
		return configObj;
	}

	ns.Config = config;
})(this);