/*global window,isHostMethod */

/*
Description:
Relies on MS `window.detachEvent`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var detachWindowListener;

if(window && isHostMethod(window, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		return window.detachEvent('on'+eventType, fn);
	};
}