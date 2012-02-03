var removeClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
		el.classList.remove(className);
    };
}