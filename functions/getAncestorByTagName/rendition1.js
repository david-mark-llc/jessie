/*global getElementParentElement,getElementTagName */

/*
Description:
Relies on `jessie.getElementParentElement` and `jessie.getElementTagName`
*/

var getAncestorByTagName;

if(getElementParentElement && getElementTagName){
	getAncestorByTagName = function(el, tagName) {
		el = getElementParentElement(el);
		while (el && tagName && getElementTagName(el) != tagName) {
			el = getElementParentElement(el);
		}
		return el;
	};
}