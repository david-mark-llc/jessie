/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Cutting edge where possible, wide support
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
