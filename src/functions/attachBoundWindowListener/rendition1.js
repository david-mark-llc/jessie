/*global bind,attachWindowListener */

/*
Description:
Relies on `jessie.bind` and `jessie.attachWindowListener`
*/

/*
Author:
Adam Silver
*/

var attachBoundWindowListener;

if(attachWindowListener && bind) {
	attachBoundWindowListener = function(eventType, fn, thisObject) {
		var listener = bind(fn, thisObject);
		return attachWindowListener(eventType, listener);
	};
}