/*global isHostObjectProperty,isHostMethod,html */

/*
Description:
Relies on the `el.classList.remove`
*/

var removeClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
			return el.classList.remove(className);
    };
}