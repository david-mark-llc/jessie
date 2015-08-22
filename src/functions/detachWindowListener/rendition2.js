/*global window,isHostMethod */

/*
Description:
Cutting edge (W3 compliant), and handles Microsoft event model
*/

/*
Degrades:
NN4, IE4, IE3
*/

/*
Author:
Adam Silver
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