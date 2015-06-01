/*global xhrCreate,xhrGet */

/*
Description:
Relies on `jessie.xhrCreate` and `jessie.xhrGet`
*/

/*
Author:
Adam Silver
*/

var ajaxGet;

if(xhrCreate && xhrGet) {
	ajaxGet = function(url, options) {
		var xhr = xhrCreate();
		return xhrGet(xhr, url, options);
	};
}