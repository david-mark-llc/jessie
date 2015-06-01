/*global html,isHostMethod */

/*
Description:
Relies on `el.parentNode` or `el.contains`
*/

/*
Degrades:
In browsers without `el.parentNode` and `el.contains`
*/

/*
Author:
Adam Silver
*/

var isAncestor;

if(isHostMethod(html, 'contains')) {
	isAncestor = function(el, elAncestor) {
		return elAncestor.contains(el);
	};
} else if(html && 'undefined' != typeof html.parentNode) {
	isAncestor = function(el, elAncestor) {
		var parent = el.parentNode;
		while(parent && parent != elAncestor) {
			parent = parent.parentNode;
		}
		return parent == elAncestor;
	};
}
