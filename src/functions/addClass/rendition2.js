/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Cutting edge and wide support
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var addClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "add") ) {
	addClass = function(el, className) {
		return el.classList.add(className);
	};
} else if (html && "string" === typeof html.className ) {
    addClass = function(el, className) {
		var re;
		if (!el.className) {
			el.className = className;
		}
		else {
			re = new RegExp('(^|\\s)' + className + '(\\s|$)');
			if (!re.test(el.className)) { el.className += ' ' + className; }
		}
    };
}