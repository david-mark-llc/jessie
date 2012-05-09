/*global undelegateQueryListener:true,undelegateListener */
// could have simply used detachListener
// but this reinforces  that this function
// expects a delegate listener which was returned
// when it was attached

if(undelegateListener) {
	undelegateQueryListener = function(el, eventType, listener) {
		undelegateListener(el, eventType, listener);
	};
}