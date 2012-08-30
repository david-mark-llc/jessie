/*global xhrCreate,xhrGet */

/*
Description:
Relies on `jessie.xhrCreate` and `jessie.xhrGet`
*/

var ajaxGet;

if(xhrCreate && xhrGet) {
	ajaxGet = function(url, options) {
		var xhr = xhrCreate();
		return xhrGet(xhr, url, options);
	};
}