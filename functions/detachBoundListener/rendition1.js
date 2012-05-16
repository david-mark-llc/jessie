/*global detachListener */
// could have simply used detachListener
// but this reinforces  that this function
// expects a bound listener

var detachBoundListener;

if(detachListener) {
	detachBoundListener = function(el, eventType, boundListener) {
		return detachListener(el, eventType, boundListener);
	};
}