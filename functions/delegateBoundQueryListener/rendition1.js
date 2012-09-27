/*global query,delegateBoundListener,isDescendant,isInQuery */

/*
Description:
Relies on `jessie.delegateBoundListener`, `jessie.query`, `jessie.isInQuery` and `jessie.isDecendant`
*/

/*
Author:
Adam Silver
*/

var delegateBoundQueryListener;

if(delegateBoundListener && query && isDescendant) {
	delegateBoundQueryListener = function(el, eventType, selector, fn, thisObject) {

		var fnDelegate = function(el, target) {
			if(isInQuery(target, selector)) {
				return target;
			}
				
			// its not in query so loop through by selector
			// if the target is a child of the element then
			// return that element
			var elements = jessie.query(selector);
			for(var i = 0; i < elements.length; i++) {
				if( isDescendant(elements[i], target) ) {
					return elements[i];
				}
			}
		};

		return delegateBoundListener(el, eventType, fn, fnDelegate, thisObject);
	};
}