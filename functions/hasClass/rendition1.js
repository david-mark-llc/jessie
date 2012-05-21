/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Relies on the classList api which is only supported in newer browsers.
*/

var hasClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "contains") ) {
	hasClass = function(el, className) {
		return el.classList.contains(className);
	};
}
