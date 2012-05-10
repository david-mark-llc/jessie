/*global delegateListener:true,attachListener,getEventTarget */

if(attachListener && getEventTarget) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
		
		var listener = function(e) {
			if(fnDelegate(getEventTarget(e))) {
				fn.call(e, e);
			}
		};
		
		return attachListener(el, eventType, listener);
		
	};
}