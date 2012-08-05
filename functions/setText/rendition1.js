/*global html */

/*
Description:
Relies on `el.textContent`
*/

var setText;

if(html && "string" == typeof html.textContent) {
	setText = function(el, text) {
		el.textContent = text;
	};
}