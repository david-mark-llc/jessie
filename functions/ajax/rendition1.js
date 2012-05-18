/*global createXhr,xhrSend */

/*
Description:
Relies on createXhr and xhrSend being defined.
*/

var ajax;

if(createXhr && xhrSend) {
	ajax = function(url, options) {
		var xhr = createXhr();
		xhrSend(xhr, url, options);
		return xhr;
	};
}