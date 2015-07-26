/*
Description:
Wide support
*/

var setAriaAttribute;

setAriaAttribute = function(el, attribute, value) {
    el.setAttribute('aria-' + attribute, value);
};