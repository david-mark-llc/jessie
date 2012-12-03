/*global html,isHostMethod */

/*
Description:
Relies on `el.removeChild`
*/

/*
Author:
Adam Silver
*/

var removeChild;

if(html && isHostMethod(html, removeChild)) {
	removeChild = function(el, childNode) {
		return el.removeChild(childNode);
	};
}