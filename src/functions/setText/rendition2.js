/*global html */

/*
Description:
Relies on `el.innerText`
*/

var setText;

if(html && "string" == typeof html.innerText) {
	setText = function(el, text) {
		el.innerText = text;
	};
}