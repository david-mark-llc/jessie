/*global global,isHostMethod */

/*
Description:
Relies on MS `window.detachEvent` for IE8 and below
*/

var detachWindowListener;

if(global && isHostMethod(global, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		global.detachEvent('on'+eventType, fn);
	};
}