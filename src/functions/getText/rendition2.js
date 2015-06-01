/*global html */

/*
Description:
Relies on `el.innerText`
*/

var getText;

if(html && "string" == typeof html.innerText) {
	getText = function(el) {
		return el.innerText;
	};
}