var attachBoundListener;

if(bind && attachListener) {
	attachBoundListener = function(el, eventType, fn, thisObject) {
		var listener = bind(fn, thisObject);
		
		return attachListener(el, eventType, listener);
	};
};