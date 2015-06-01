/*global html,isHostMethod */

/*
Author:
Adam Silver
*/

var isAncestor;

if(isHostMethod(html, 'contains')) {
	isAncestor = function(el, elAncestor) {
		return elAncestor.contains(el);
	};
}