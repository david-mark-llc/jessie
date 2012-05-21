/*global bind,attachListener,getEventTarget */

/*
Description:
Relies on attachListener, bind and getEventTarget
*/

var delegateBoundListener;

if(attachListener && bind && getEventTarget) {
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