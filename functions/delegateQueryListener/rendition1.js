/*global query,isDescendant,delegateListener,isInQuery */

/*
Description:
Relies on `jessie.isNodeInNodeList`, `jessie.delegateListener`, `jessie.query` and `jessie.isDescendant`
*/

/*
Author:
Adam Silver, Graham Veal
*/

var delegateQueryListener;

if(isNodeInNodeList && delegateListener && query && isDescendant) {

	delegateQueryListener = function(el, eventType, selector, fn) {

		var elements = query(selector);

		function fnDelegate(target) {

			var i = 0,
				l,
				el;

			if(isNodeInNodeList(target, elements)) {
				return target;
			}

			// its not in query so loop through by selector
			// if the target is a child of the element then
			// return that element

			for( l = elements.length ; i < l; i++ ) {

				el = elements[i];

				if( isDescendant(el, target) ) {
					return el;
				}
			}
		}

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}