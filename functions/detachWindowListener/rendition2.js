/*global global,isHostMethod */

/*
Description:
Relies on MS `window.detachEvent`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var detachWindowListener;

if(global && isHostMethod(global, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		global.detachEvent('on'+eventType, fn);
	};
}