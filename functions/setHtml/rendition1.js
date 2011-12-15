/*

See: https://groups.google.com/forum/#!search/david$20mark$20innerHTML/comp.lang.javascript/QQ9ClOT6igQ/LIZ5QXmmuw0J

NOTE: Don't use this rendition with anything but DIV's 

Degrades in IE 3 :) 

*/

if(html && isHostObjectProperty(html, "innerHTML")) {
	var setHtml = function(el, html) {
		el.innerHTML = html;	
	};
}