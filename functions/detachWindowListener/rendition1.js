/*global window,isHostMethod */

/*
Description:
Relies on W3C `window.removeEventListener`
*/

/*
Degrades:
IE8, Opera 7.6
*/

var detachWindowListener;

if(window && isHostMethod(window, 'removeEventListener')) {
	detachWindowListener = function(eventType, fn) {
		return window.removeEventListener(eventType, fn);
	};
}