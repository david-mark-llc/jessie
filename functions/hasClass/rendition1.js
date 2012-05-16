/*global html,isHostObjectProperty,isHostMethod */

var hasClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "contains") ) {
	hasClass = function(el, className) {
		return el.classList.contains(className);
	};
}
