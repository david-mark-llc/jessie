/* */

var setAriaAttribute;

/*
 * setAriaAttribute
 * 
 * Description:
 * 
 */

setAriaAttribute = function(el, attribute, value) {
    el.setAttribute('aria-' + attribute, value);
};