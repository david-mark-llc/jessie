/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Relies on the `el.classList.add`
*/

/*
Degrades:
Chrome 7, FF3.5, IE9, Safari 5.0, Opera 11.1, IOS Safari 4.3, Opera Mini 6.0, Opera Mobile 11.0, Android Safari 2.3
*/

var addClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "add") ) {
	addClass = function(el, className) {
		return el.classList.add(className);
	};
}