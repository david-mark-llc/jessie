/*global bind,attachListener */

/*
Description:
Relies on `jessie.bind` and `jessie.attachListener`
*/

/*
Author:
Adam Silver
*/

var attachBoundListener;

if(bind && attachListener) {
	attachBoundListener = function(el, eventType, fn, thisObject) {
		var listener = bind(fn, thisObject);
		thisObject = null;
		return attachListener(el, eventType, listener);
	};
}