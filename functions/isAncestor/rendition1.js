/*global html */

/*
Description:
Relies on `el.parentNode` which has very good support
*/

/*
Degrades:
In browsers without `el.parentNode`
*/

/*
Author:
Adam Silver
*/

var isAncestor;

if(html && 'undefined' != typeof html.parentNode) {
	isAncestor = function(el, elAncestor) {
		var parent = el.parentNode;
		while(parent && parent != elAncestor) {
			parent = parent.parentNode;
		}
		return parent == elAncestor;
	};
}
