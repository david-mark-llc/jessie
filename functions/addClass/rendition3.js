/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Relies on the `el.classList.add` or `el.className` property providing greatest browser support
*/

/*
Degrades:
Browsers that don't support DOM nodes with a className property
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