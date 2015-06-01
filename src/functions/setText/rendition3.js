/*global html */

/*
Description:
Relies on `el.textContent` or `el.innerText` providing widest browser support.
*/

var setText;

if(html && "string" == typeof html.textContent) {
	setText = function(el, text) {
		el.textContent = text;
	};
} else if(html && "string" == typeof html.innerText) {
	setText = function(el, text) {
		el.innerText = text;
	};
}