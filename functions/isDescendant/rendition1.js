/*global html */

/*
Description:
Relies on `el.parentNode` which has very good support
*/

var isDescendant;

if(html && 'undefined' != typeof html.parentNode) {
	isDescendant = function(el, elDescendant) {
		// TODO: this could be refactored to save space
		var parent = elDescendant.parentNode;
		while(parent && parent != el) {
			parent = parent.parentNode;
		}
		return parent == el;
	};
}