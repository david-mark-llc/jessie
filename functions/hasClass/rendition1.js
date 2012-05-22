/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Relies on the `el.classList.contains`
*/

var hasClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "contains") ) {
	hasClass = function(el, className) {
		return el.classList.contains(className);
	};
}
