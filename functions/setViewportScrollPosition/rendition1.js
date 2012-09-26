/*global isHostMethod,global */

/*
Description:
Relies on `window.scrollTo`
*/

var setViewportScrollPosition;

if(isHostMethod(global, "scrollTo")) {
	setViewportScrollPosition = function(x, y) {
		window.scrollTo(x, y);
	};
}