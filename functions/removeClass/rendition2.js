/*global removeClass:true,isHostObjectProperty,isHostMethod,html */

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
		el.classList.remove(className);
    };
}