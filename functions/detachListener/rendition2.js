/*global html,isHostMethod */

/*
Description:
Relies on MS `el.detachEvent` and works in IE8-
*/

/*
Support:
IE6 - IE8
*/

var detachListener;

if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) {
		el.detachEvent('on'+eventType, fn);
	};
}