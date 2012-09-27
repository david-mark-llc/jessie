/*global bind,attachListener,getEventTarget,canCall */

/*
Description:
Relies on `jessie.attachListener`, `jessie.bind` and `jessie.getEventTarget` and `Function.prototype.call`
*/

/*
Author:
Adam Silver
*/

var delegateBoundListener;

if(attachListener && bind && getEventTarget && canCall) {
	delegateBoundListener = function(el, eventType, fn, fnDelegate, thisObject) {
		
		var listener = bind(function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(thisObject, e, currentTarget);
			}
		}, thisObject);
		
		return attachListener(el, eventType, listener);
	};
}