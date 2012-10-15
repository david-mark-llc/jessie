/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Relies on the `el.classList.contains` or `el.className` property providing the greatest browser support
*/

/*
Author:
Adam Silver
*/

var hasClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "contains") ) {
	hasClass = function(el, className) {
		return el.classList.contains(className);
	};
} else if(html && 'string' == typeof html.className) {
	hasClass = function(el, className) {
		return (new RegExp('(^|\\s)' + className + '(\\s|$)')).test(el.className);
	};
}