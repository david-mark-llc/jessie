/*global isHostObjectProperty,isHostMethod,html */

/*
Description:
Relies on the `el.classList.remove` or `el.className` property providing greatest browser support
*/

/*
Author:
Adam Silver
*/

var removeClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
		return el.classList.remove(className);
    };
} else if(html && "string" == typeof html.className) {
	removeClass = function(el, className) {
		var re, m;
		if (el.className) {
			if (el.className == className) {
				el.className = '';
			} else {
				re = new RegExp('(^|\\s)' + className + '(\\s|$)');
				m = el.className.match(re);
				if (m && m.length == 3) {
					el.className = el.className.replace(re, (m[1] && m[2])?' ':'');
				}
			}
		}
	};
}