/*global createXhr,xhrSend */

/*
Description:
Relies on `jessie.createXhr` and `jessie.xhrSend`
*/

var ajax;

if(createXhr && xhrSend) {
	ajax = function(url, options) {
		var xhr = createXhr();
		xhrSend(xhr, url, options);
		return xhr;
	};
}