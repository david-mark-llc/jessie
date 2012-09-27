/*global detachListener */

/*
Description:
Relies on `jessie.detachListener`
*/

/*
Author:
Adam Silver
*/

var undelegateListener;

if(detachListener) {
	undelegateListener = function(el, eventType, delegateListener) {
		return detachListener(el, eventType, delegateListener);
	};
}