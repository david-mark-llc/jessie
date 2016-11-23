/*global isHostObjectProperty,isHostMethod,html */

/*
Description:
Cutting edge where possible, wide support
*/

/*
Author:
Adam Silver
*/

var removeClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
        el.classList.remove(className);
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
