/*global html,isHostMethod */

/*
Description:
Relies on `jessie.removeEventListener` or `el.detachEvent` providing widest support
*/

/*
Degrades:

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