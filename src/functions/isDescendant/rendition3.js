/*global html,isHostMethod */

/*
Description:
Relies on `el.parentNode` or `el.contains`
*/

/*
Degrades:
In browsers without `el.parentNode` and `el.contains`
*/

var isDescendant;

if(isHostMethod(html, 'contains')) {
	isDescendant = function(el, elDescendant) {
		return el.contains(elDescendant);
	};
} else if(html && 'undefined' != typeof html.parentNode) {
	isDescendant = function(el, elDescendant) {
		var parent = elDescendant.parentNode;
		while(parent && parent != el) {
			parent = parent.parentNode;
		}
		return parent == el;
	};
}