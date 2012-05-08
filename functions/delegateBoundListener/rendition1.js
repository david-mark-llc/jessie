/*global delegateBoundListener:true,bind,attachListener,getEventTarget */

if(attachListener && bind) {
	delegateBoundListener = function(el, eventType, fn, fnDelegate, thisObject) {
		var listener = bind(function(e) {
			var sourceNode = fnDelegate(getEventTarget(e));
			if(sourceNode) {
				fn.call(thisObject, e, sourceNode);
			}
		}, thisObject);
		
		return attachListener(el, eventType, listener);
	};
}