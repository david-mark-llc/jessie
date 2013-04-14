/*global html, globalDocument, isHostObjectProperty*/

var getElementParentElement;

/*
Description:
Relies on `el.parentNode`
*/

/* 
Degrades:
IE5, IE4, IE3
*/

if (html && isHostObjectProperty(html, 'parentNode')) {
	getElementParentElement = function(el) {
		var parentNode = el.parentNode,
			parentElement = null;

		if (parentNode && (parentNode.tagName || parentNode.nodeType == 1)) {
			parentElement = parentNode;
		}
		return parentElement;
	};
}