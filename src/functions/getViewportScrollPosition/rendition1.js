/*global global*/

/*
Description:
Cutting edge
*/

/*
Author:
David Mark
*/

var getViewportScrollPosition;

if('number' == typeof window.pageXOffset && 'number' == typeof window.pageYOffset ) {
	/*
	Many "standards-based" browsers feature this non-standard property. No ambiguity about what this window property means
	 */
	getViewportScrollPosition = function() {
		return [window.pageXOffset, window.pageYOffset];
	};
}