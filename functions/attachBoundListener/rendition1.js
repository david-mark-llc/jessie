var attachBoundListener;

if(bind && attachListener) {
	attachBoundListener = function(el, eventType, fn, thisObject) {
		var listener = bind(fn, thisObject);
		
		attachListener(el, eventType, listener);
		
		// returns bound listener function so that we can unbind later if needed
		return listener;
	};
};