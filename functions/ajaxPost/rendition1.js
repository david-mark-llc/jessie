/*global xhrCreate,xhrPost */

/*
Description:
Relies on `jessie.xhrCreate` and `jessie.xhrPost`
*/

/*
Author:
Adam Silver
*/

var ajaxPost;

if(xhrCreate && xhrPost) {
	ajaxPost = function(url, options) {
		var xhr = xhrCreate();
		return xhrPost(xhr, url, options);
	};
}