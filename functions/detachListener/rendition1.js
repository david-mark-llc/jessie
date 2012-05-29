/*global html,isHostMethod */

/*
Description:
Relies on W3C `jessie.el.removeEventListener`
*/

/*
Support:
IE8, Opera 7.6
*/

var detachListener;

if(html && isHostMethod(html, 'removeEventListener')) {
	detachListener = function(el, eventType, fn) {
		el.removeEventListener(eventType, fn, false);
	};
}