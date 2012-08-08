/*global html */

/*
Description:
Relies on `el.textContent` or `el.innerText` providing widest browser support.
*/

var getText;

if(html && "string" == typeof html.textContent) {
	getText = function(el) {
		return el.textContent;
	};
} else if(html && "string" == typeof html.innerText) {
	getText = function(el) {
		return el.innerText;
	};
}