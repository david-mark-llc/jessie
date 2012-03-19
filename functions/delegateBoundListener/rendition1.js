var delegateBoundListener;

if(delegateListener && bind) {
	delegateBoundListener = function(el, eventType, fn, fnDelegate, thisObject) {
		var listener = bind(function(e) {
			if(fnDelegate(getEventTarget(e))) {
				fn.call(thisObject, e);
			}
		}, thisObject);
		
		attachListener(el, eventType, listener);
		return listener;		
	};
};