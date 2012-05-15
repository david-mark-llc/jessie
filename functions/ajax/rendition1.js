/*global ajax:true,createXhr,xhrSend */

var ajax;

if(createXhr && xhrSend) {
	ajax = function(url, options) {
		var xhr = createXhr();
		xhrSend(xhr, url, options);
		return xhr;
	};
}