/*global html,isHostMethod */

/*
Description:
Relies on MS `el.detachEvent`
*/

/*
Degrades:
IE10, IE9, IE4, IE3, NN4, Opera 8+,Chrome, FF, Safari
*/

/*
Author:
David Mark
*/

var detachListener;

if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) {
		el.detachEvent('on'+eventType, fn);
	};
}