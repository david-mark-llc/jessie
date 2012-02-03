var addClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "add") ) {
    addClass = function(el, className) {
		el.classList.add(className);
    };
}