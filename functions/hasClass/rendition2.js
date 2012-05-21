/*global html */

/*
Description:
Relies on the el.className property (class attribute) which has very good support
*/

var hasClass;

if(html && 'string' == typeof html.className) {
	hasClass = function(el, className) {
		return (new RegExp('(^|\\s)' + className + '(\\s|$)')).test(el.className);
	};
}
