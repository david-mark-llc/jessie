/*global undelegateListener:true,detachListener */

if(detachListener) {
	undelegateListener = function(el, eventType, delegateListener) {
		detachListener(el, eventType, delegateListener);
	};
}