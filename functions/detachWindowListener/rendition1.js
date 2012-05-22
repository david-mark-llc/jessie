/*global global,isHostMethod */

/*
Description:
Relies on W3C `window.removeEventListener` and degrades in IE8-
*/

var detachWindowListener;

if(global && isHostMethod(global, 'removeEventListener')) {
	detachWindowListener = function(eventType, fn) {
		global.removeEventListener(eventType, fn);
	};
}