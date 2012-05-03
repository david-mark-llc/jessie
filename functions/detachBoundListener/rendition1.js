/*global detachBoundListener:true,detachListener */
// could have simply used detachListener
// but this reinforces  that this function
// expects a bound listener

if(detachListener) {
	detachBoundListener = function(el, eventType, boundListener) {
		detachListener(el, eventType, boundListener);
	};
}