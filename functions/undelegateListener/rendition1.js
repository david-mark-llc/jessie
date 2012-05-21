/*global detachListener */

/*
Description:
Relies on jessie.detachListener
*/

var undelegateListener;

if(detachListener) {
	undelegateListener = function(el, eventType, delegateListener) {
		return detachListener(el, eventType, delegateListener);
	};
}