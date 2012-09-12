/*global html,getElementParentElement,hasClass */

/*
Description:
Relies on `el.className` property, `jessie.getElementParentElement` and `jessie.hasClass`
*/

var getAncestorByClassName;

if(html && 'string' == typeof html.className && getElementParentElement && hasClass) {
	getAncestorByClassName = function(el, className) {
		el = getElementParentElement(el);
		while (el && !hasClass(el, className)) {
			el = getElementParentElement(el);
		}
		return el;
	};
}