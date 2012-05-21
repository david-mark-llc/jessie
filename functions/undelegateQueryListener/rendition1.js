/*global undelegateListener */
// could have simply used detachListener
// but this reinforces  that this function
// expects a delegate listener which was returned
// when it was attached

/*
Description:
Relies on `jessie.undelegateListener`
*/

var undelegateQueryListener;

if(undelegateListener) {
	undelegateQueryListener = function(el, eventType, listener) {
		return undelegateListener(el, eventType, listener);
	};
}