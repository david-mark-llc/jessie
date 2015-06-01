/*global global*/

/*
Description:
Relies on `window.page(X/Y)Offset
*/

/*
Author:
David Mark
*/

var getViewportScrollPosition;

if('number' == typeof window.pageXOffset && 'number' == typeof window.pageYOffset ) {
	getViewportScrollPosition = function() {
		return [window.pageXOffset, window.pageYOffset];
	};
}