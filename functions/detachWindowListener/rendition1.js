/*global global,isHostMethod */

/*
Description:
Relies on W3C `window.removeEventListener`
*/

/*
Support:
IE8, Opera 7.6
*/

var detachWindowListener;

if(global && isHostMethod(global, 'removeEventListener')) {
	detachWindowListener = function(eventType, fn) {
		global.removeEventListener(eventType, fn);
	};
}