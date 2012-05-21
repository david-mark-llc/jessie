/*global global,isHostMethod */

/*
Description:
Relies on window.detachEvent and works in IE8-
*/

var detachWindowListener;

if(global && isHostMethod(global, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		global.detachEvent('on'+eventType, fn);
	};
}