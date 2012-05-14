/*global addClass:true,html,isHostObjectProperty,isHostMethod */
if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "add") ) {
  addClass = function(el, className) {
  	return el.classList.add(className);
  };
}