/*global html,isHostMethod */

/*
Description:
Relies on MS `el.detachEvent`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var detachListener;

if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) {
		el.detachEvent('on'+eventType, fn);
	};
}