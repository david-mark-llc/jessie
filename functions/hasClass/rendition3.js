
/*
Description:
Tests for 'el.classList.contains' and 'el.className'
but falls back to 'el.className' in order to provide the greatest browser support
*/

/*
Degrades:
IE5, Chrome 3, Firefox 2, Safari 3, Opera 10
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