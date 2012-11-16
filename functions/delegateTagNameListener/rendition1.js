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
			var sourceNode,
                descendant;

			if(getElementTagName(target) === tagName) {
				sourceNode = target;
			} else {
                descendant = target.parentNode;

                while (descendant !== el) {
                    if (getElementTagName(descendant) === tagName) {
                        sourceNode = descendant;
                        break;
                    }
                    descendant = descendant.parentNode;
                }
            }
			return sourceNode;
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}