/*global isHostMethod,global */

/*
Description:
Relies on `window.scrollTo`
*/

var setScrollPosition;

if(isHostMethod(global, "scrollTo")) {
	setScrollPosition = function(x, y) {
		window.scrollTo(x, y);
	};
}