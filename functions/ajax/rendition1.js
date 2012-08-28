/*global xhrCreate,xhrSend */

/*
Description:
Relies on `jessie.xhrCreate` and `jessie.xhrSend`
*/

var ajax;

if(xhrCreate && xhrSend) {
	ajax = function(url, options) {
		var xhr = xhrCreate();
		xhrSend(xhr, url, options);
		return xhr;
	};
}