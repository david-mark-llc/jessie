/*global html,isHostMethod */

/*
Description:
Relies on el.removeEventListener and degrades in IE8-
*/

var detachListener;

if(html && isHostMethod(html, 'removeEventListener')) {
	detachListener = function(el, eventType, fn) {
		el.removeEventListener(eventType, fn, false);
	};
}