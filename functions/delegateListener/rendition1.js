/*global delegateListener:true,attachListener,getEventTarget */

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