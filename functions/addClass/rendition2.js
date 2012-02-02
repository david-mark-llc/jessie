var addClass;

if (html && isHostObjectProperty(html, "classList") ) {
    addClass = function(el, className) {
		el.classList.add(className);
    };
}