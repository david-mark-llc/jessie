/*global attachListener,getEventTarget */

/*
Description:
Relies on `jessie.attachListener` and `jessie.getEventTarget`
*/

var delegateListener;

if(attachListener && getEventTarget) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
		
		var listener = function(e) {
			var sourceNode = fnDelegate(el, getEventTarget(e));
			if(sourceNode) {
				fn.call(sourceNode, e, sourceNode);
			}
		};
		
		return attachListener(el, eventType, listener);
		
	};
}