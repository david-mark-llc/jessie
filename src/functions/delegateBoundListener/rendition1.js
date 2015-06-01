/*global attachListener,getEventTarget,canCall */

/*
Description:
Relies on `jessie.attachListener` and `jessie.getEventTarget` and `Function.prototype.call`
*/

/*
Author:
Adam Silver
*/

var delegateBoundListener;

if(attachListener && getEventTarget && canCall) {
	delegateBoundListener = function(el, eventType, fn, fnDelegate, thisObject) {

		var listener = function(e) {

			var currentTarget = fnDelegate(el, getEventTarget(e));

			if(currentTarget) {
				fn.call(thisObject, e, currentTarget);
			}
		};

		return attachListener(el, eventType, listener);
	};
}