/*global html,getElementParent,hasClass */

/*
Description:
Relies on className property, jessie.getElementParent, jessie.hasClass
*/

var getAncestorByClassName;

if(html && 'string' == typeof html.className && getElementParent && hasClass) {
	getAncestorByClassName = function(el, className) {
		el = getElementParent(el);
		while (el && !hasClass(el, className)) {
			el = getElementParent(el);
		}
		return el;
	};
}