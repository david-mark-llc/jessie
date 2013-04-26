/*global html,isHostMethod */

/*
Description:
Relies on `el.appendChild`
*/

/*
Author:
Adam Silver
*/

var appendChild;

if(html && isHostMethod(html, 'appendChild')) {
	appendChild = function(el, appendEl) {
		return el.appendChild(appendEl);
	};
}
