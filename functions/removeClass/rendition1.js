/*global isHostObjectProperty,isHostMethod,html */

/*
Description:
Relies on the classList api which is only supported in newer browsers.
*/

var removeClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
			return el.classList.remove(className);
    };
}