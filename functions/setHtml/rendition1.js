/*global html */

/*
Description:
Relies on `el.innerHTML` which degrades in IE3
*/

/*
See: <a href="https://groups.google.com/forum/#!search/david$20mark$20innerHTML/comp.lang.javascript/QQ9ClOT6igQ/LIZ5QXmmuw0J">Related article</a>
NOTE: Don't use this rendition with anything but DIV's
*/

/*
Degrades:
IE3
*/

/*
Author:
David Mark
*/

var setHtml;

if(html && "string" == typeof html.innerHTML) {
	setHtml = function(el, html) {
		el.innerHTML = html;
	};
}