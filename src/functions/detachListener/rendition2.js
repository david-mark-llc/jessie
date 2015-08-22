/*global html,isHostMethod */

/*
Description:
Cutting egde (W3 compliant) and Microsoft event model handled.
*/

/*
Degrades:
IE5, NN4
*/

/*
Author:
Adam Silver
*/

var detachListener;

if(html && isHostMethod(html, 'removeEventListener')) {
	detachListener = function(el, eventType, fn) {
		el.removeEventListener(eventType, fn, false);
	};
} else if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) {
		el.detachEvent('on'+eventType, fn);
	};
}