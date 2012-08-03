/*global html */

/*
Description:
Relies on `el.textContent`
*/

var getText;

if(html && "string" == typeof html.textContent) {
	getText = function(el) {
		return el.textContent;
	};
}