var BG=chrome.extension.getBackgroundPage();document.getElementById("image_file").addEventListener("change",handleFileSelect,!1);var dropZone=document.getElementById("dropZone");function handleFileDrop(e){e.stopPropagation(),e.preventDefault(),readFile(e.dataTransfer.files[0])}function handleFileSelect(e){e.stopPropagation(),e.preventDefault(),readFile(e.target.files[0])}function readFile(e){var n=e.name.match(/(.*)\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)[1],a=new FileReader;a.onload=function(e){var t=e.target.result;BG.getSelectedTab(function(){BG.type="visible",BG.menuType="upload",BG.tabtitle=n;var a=document.createElement("img");a.src=t,a.onload=function(){BG.dataURL.push(a);var e=chrome.runtime.getURL("")+"edit-react.html";chrome.tabs.update({url:e})}})},a.readAsDataURL(e)}function handleDragHover(e){e.stopPropagation(),e.preventDefault(),dropZone.className="dragover"==e.type?"hover":""}dropZone.addEventListener("dragover",handleDragHover,!1),dropZone.addEventListener("dragleave",handleDragHover,!1),dropZone.addEventListener("drop",handleFileDrop,!1),document.body.addEventListener("paste",function(e){(e.stopPropagation(),e.preventDefault(),e.clipboardData&&e.clipboardData.files.length)&&readFile(e.clipboardData.files[0])}),document.body.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="none"},!1);