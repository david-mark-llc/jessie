/*global delegateListener,getElementTagName */

/*
Description:
Relies on `jessie.delegateListener` amd `jessie.getElementTagName`
*/

var delegateTagNameListener;

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {
		
		var fnDelegate = function(target) {
			var sourceNode;
			if(getElementTagName(target) === tagName) {
				sourceNode = target;
			}
			return sourceNode;
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}