/*global window,isHostMethod */

/*
Description:
Relies on W3C `window.removeEventListener` or `window.detachEvent`
*/

/*
Degrades:
NN4, IE4, IE3
*/

var detachWindowListener;

if(window && isHostMethod(window, 'removeEventListener')) {
	detachWindowListener = function(eventType, fn) {
		return window.removeEventListener(eventType, fn);
	};
} else if(window && isHostMethod(window, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		return window.detachEvent('on'+eventType, fn);
	};
}