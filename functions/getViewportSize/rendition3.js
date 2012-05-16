/*global html */
/*
	Works in IE7, IE8, IE9, Chrome, FF 3.6.18
	Haven't tested in IE6
*/

var getViewportSize;

if(html && 'number' == typeof html.clientWidth) {
	getViewportSize = function(win) {
		var html = win.document.documentElement;
		return [html.clientWidth, html.clientHeight];
	};
}