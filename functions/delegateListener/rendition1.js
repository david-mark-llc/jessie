/*global attachListener,getEventTarget,canCall */

/*
Description:
Relies on `jessie.attachListener` and `jessie.getEventTarget` `Function.prototype.call`
*/

/*
Author:
Adam Silver
*/

var delegateListener;

if(attachListener && getEventTarget && canCall) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
			
		var listener = function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(currentTarget, e, currentTarget);
			}
		};
		
		return attachListener(el, eventType, listener);
	};
}