/*global delegateListener,getElementTagName,getElementParentElement */

/*
Description:
Relies on `jessie.delegateListener` and `jessie.getElementTagName` and `jessie.getElementParentElement`
*/

/*
Author:
Adam Silver
*/

var delegateTagNameListener;

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {

		var fnDelegate = function(el, target) {
			var sourceNode,
				descendant;

			if(getElementTagName(target) === tagName) {
				sourceNode = target;
			} else {
				descendant = getElementParentElement(target);

				if (null !== descendant) {
					while (descendant !== el) {
						if (getElementTagName(descendant) === tagName) {
							sourceNode = descendant;
							break;
						}
						descendant = getElementParentElement(descendant);
					}
				}
			}
			return sourceNode;
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}