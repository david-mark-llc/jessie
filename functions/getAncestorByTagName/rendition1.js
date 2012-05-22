/*global getElementParent,getElementTagName */

/*
Description:
Relies on `jessie.getElementParent` and `jessie.getElementTagName`
*/

var getAncestorByTagName;

if(getElementParent && getElementTagName){
	getAncestorByTagName = function(el, tagName) {
		el = getElementParent(el);
		while (el && tagName && getElementTagName(el) != tagName) {
			el = getElementParent(el);
		}
		return el;
	};
}