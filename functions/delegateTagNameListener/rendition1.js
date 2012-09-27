/*global delegateListener,getElementTagName */

/*
Description:
Relies on `jessie.delegateListener` amd `jessie.getElementTagName`
*/

/*
Author:
Adam Silver
*/

var delegateTagNameListener;

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {
		
		var fnDelegate = function(el, target) {
			var sourceNode;
			if(getElementTagName(target) === tagName) {
				sourceNode = target;
			}
			return sourceNode;
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}