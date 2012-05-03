/*global detachWindowListener:true,global,isHostMethod */

if(global && isHostMethod(global, 'removeEventListener')) {
	detachWindowListener = function(eventType, fn) {
		global.removeEventListener(eventType, fn);
	};
}