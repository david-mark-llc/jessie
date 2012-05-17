/*global global,isHostMethod */

var detachWindowListener;

if(global && isHostMethod(global, 'removeEventListener')) {
	detachWindowListener = function(eventType, fn) {
		global.removeEventListener(eventType, fn);
	};
}