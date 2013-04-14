/*global isHostMethod */

/*
Description:
Relies on `window.scrollTo`
*/

var setScrollPosition;

if(isHostMethod(window, "scrollTo")) {
	setScrollPosition = function(x, y) {
		window.scrollTo(x, y);
	};
}