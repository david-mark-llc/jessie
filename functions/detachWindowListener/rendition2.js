/*global window,isHostMethod */

/*
Description:
Relies on MS `window.detachEvent`
*/

/*
Degrades:
IE10, IE9, IE4, NN4, Opera 8+,Chrome, FF, Safari
*/

var detachWindowListener;

if(window && isHostMethod(window, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		return window.detachEvent('on'+eventType, fn);
	};
}