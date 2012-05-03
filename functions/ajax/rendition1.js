/*global ajax:true,createXhr,xhrSend*/
if(createXhr && xhrSend) {
	ajax = function(url, options) {
		var xhr = createXhr();
		xhrSend(xhr, url, options);
		return xhr;
	};
}