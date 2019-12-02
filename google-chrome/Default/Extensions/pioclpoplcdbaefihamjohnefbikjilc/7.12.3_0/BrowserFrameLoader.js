!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=837)}({190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSelection=function(e=window){return e.getSelection()},t.getRanges=function(e){const t=[];for(let n=0;n<e.rangeCount;n++)e.getRangeAt(n).collapsed||t.push(e.getRangeAt(n));return t},t.createRange=function(e){if(!e)return null;const t=e,n=document.createRange(),r=document.querySelector(t.startContainer).childNodes[e.startTextNodePosition],s=document.querySelector(t.endContainer).childNodes[e.endTextNodePosition];if(r&&s)return n.setStart(r,t.startOffset||0),n.setEnd(s,t.endOffset||0),n;return null},t.removeSelection=function(e=window){e.getSelection().empty?e.getSelection().empty():e.getSelection().removeAllRanges&&e.getSelection().removeAllRanges()},t.isRangeAfter=function(e,t){return e.compareBoundaryPoints(Range.START_TO_START,t)>0||e.compareBoundaryPoints(Range.END_TO_END,t)>0||e.compareBoundaryPoints(Range.END_TO_START,t)>0||e.compareBoundaryPoints(Range.START_TO_END,t)>0},t.isNodeInRange=function(e,t,n=window){if(n.document.createRange().selectNode(e),e.nodeValue&&t.isPointInRange(e,0))return!0;if(e===t.startContainer||e===t.endContainer)return!0;if(e===t.startContainer.childNodes[0]||e===t.startContainer.childNodes[0])return!0;return!1}},191:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};const s="__error__",a="EN_request",i="EN_response";t.default=class{constructor(e,t){this._channelName=e||"",this._requestHandlers=t,this._uniqueMessageID=0,this._pendingMessages={},this._handleMessage=this._handleMessage.bind(this)}start(){window.addEventListener("message",this._handleMessage)}stop(){window.removeEventListener("message",this._handleMessage)}sendMessageToFrame(e,t,n){return this.sendMessage(e.contentWindow,t,n)}sendMessageToParent(e,t){return this.sendMessage(window.parent,e,t)}sendMessage(e,t,n){return new Promise((r,s)=>{const i=`${this._channelName}-${++this._uniqueMessageID}`,o={type:a,messageID:i,name:t,data:n};this._pendingMessages[i]={name:t,resolve:r,reject:s},e.postMessage(o,"*")})}_handleMessage(e){if(!e.data)return Promise.resolve();switch(e.data.type){case a:return this._handleRequest(e.data,e.source);case i:return this._handleResponse(e.data);default:return Promise.resolve()}}_handleRequest(e,t){const n=e.name,a=e.messageID,o=this._requestHandlers[n];if(!o)return;const l=o(e.data||{});Promise.resolve(l).catch(e=>({[s]:r({},e,{stack:e.stack,message:e.message})})).then(e=>{const r={type:i,messageID:a,name:n,data:e};t.postMessage(r,"*")})}_handleResponse(e){const t=e.messageID,n=this._pendingMessages[t];if(!n)return;const r=n.resolve,a=n.reject;e.data&&e.data[s]&&a(e.data[s]),r(e.data),delete this._pendingMessages[t]}}},38:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SERIALIZER_IGNORED_CLASS="en-serializer-ignore",t.MessageNames={FORWARD_FETCH_REQUEST:"EN_forwardFetchRequest",REPORT_PROGRESS:"EN_progress",INSTALL_SERIALIZER:"EN_installFrameSerializer",INSTALL_AND_SERIALIZE_ALL:"EN_installAndSerializeAll",INSTALL_AND_SERIALIZE_TO:"EN_installAndSerializeTo",SERIALIZE:"EN_serialize"},t.ClipTypes={ARTICLE:"article",FULL_PAGE:"fullPage",SIMPLIFIED:"simplified",PDF:"pdf",EMAIL:"email",SELECTION:"selection",BOOKMARK:"bookmark",SCREENSHOT:"screenshot",TOP_SITE:"topsite"}},837:function(e,t,n){"use strict";var r,s=n(191),a=(r=s)&&r.__esModule?r:{default:r},i=n(38),o=n(190);const l=2e3,c={frameSerializer:""};(new class{constructor(){this._completed=!1,this._timeoutID=null,this._frameChannel=new a.default("BrowserFrameLoader",{[i.MessageNames.INSTALL_SERIALIZER]:e=>this.installAllFrameSerializers(e),[i.MessageNames.INSTALL_AND_SERIALIZE_ALL]:e=>this.installAndSerializeAll(e),[i.MessageNames.INSTALL_AND_SERIALIZE_TO]:e=>this.installAndSerizalizeTo(e)}),chrome&&chrome.runtime&&chrome.runtime.getURL&&"function"==typeof chrome.runtime.getURL&&(c.frameSerializer=chrome.runtime.getURL("FrameSerializer.js"))}start(){this._frameChannel.start()}stop(){this._frameChannel.stop()}installAndSerizalizeTo({frameName:e}){const t=document.querySelector(`.${e}`);return this._frameChannel.sendMessageToFrame(t,i.MessageNames.INSTALL_SERIALIZER).catch(e=>{console.warn(e)}).then(()=>this._frameChannel.sendMessageToFrame(t,i.MessageNames.SERIALIZE))}installAndSerializeAll({target:e,rangeInfo:t=null}){this._completed=!1;const n=(0,o.createRange)(JSON.parse(t));return new Promise(r=>{const s=()=>{this._completed||(this._completed=!0,window.clearTimeout(this._timeoutID),r(this._frameChannel.sendMessage(window,i.MessageNames.SERIALIZE,{target:e,rangeInfo:t})))};this._timeoutID=window.setTimeout(()=>{s()},l),this.installAllFrameSerializers({target:e,range:n}).then(()=>{s()})})}installAllFrameSerializers({target:e,range:t}){return Promise.all([this._installScript("frameSerializer"),this._installChildFrameSerializers({target:e,range:t})])}_installChildFrameSerializers({target:e,range:t}){const n=document.querySelector(e)||document;return new Promise(e=>{let r=[].slice.apply(n.querySelectorAll(`iframe:not(.${i.SERIALIZER_IGNORED_CLASS})`));t&&(r=r.filter(e=>t.intersectsNode(e))),r.length||e();const s=[];r.forEach(e=>{s.push(this._frameChannel.sendMessageToFrame(e,i.MessageNames.INSTALL_SERIALIZER))}),Promise.all(s).then(e),setTimeout(e,l)})}_installScript(e){return new Promise((t,n)=>{if(c[e]||t(),document.querySelector(`script[src='${c[e]}']`))return void t();const r=document.createElement("script");r.type="text/javascript",r.src=c[e],r.onload=()=>{t()},r.onerror=()=>{n(new Error(`Failed to load script: "${c[e]}"`))},document.head.appendChild(r)})}}).start()}});