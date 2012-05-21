/*global attachListener,getEventTarget */

/*
Description:
Relies on attachListener and getEventTarget
*/

var delegateListener;

if(attachListener && getEventTarget) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
		
		var listener = function(e) {
			var sourceNode = fnDelegate(getEventTarget(e));
			if(sourceNode) {
				fn.call(e, e, sourceNode);
			}
		};
		
		return attachListener(el, eventType, listener);
		
	};
}