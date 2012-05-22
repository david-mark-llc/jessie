/*global html */

/*
Description:
Relies on the `el.className` property
*/

var hasClass;

if(html && 'string' == typeof html.className) {
	hasClass = function(el, className) {
		return (new RegExp('(^|\\s)' + className + '(\\s|$)')).test(el.className);
	};
}
