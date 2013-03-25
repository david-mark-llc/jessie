/*global globalDocument, isHostObjectProperty*/

var getElementParentElement;

/*
Description:
Relies on 'el.parentElement' or `el.parentNode`
*/

/* 
Degrades:
IE3
*/

if( isHostObjectProperty( globalDocument, 'head' ) && isHostObjectProperty(globalDocument.head, 'parentElement')) {

	getElementParentElement = function(el) {
		return el.parentElement;
	};

} else if( isHostObjectProperty( globalDocument, 'head' ) && isHostObjectProperty(globalDocument.head, 'parentNode')) {

	getElementParentElement = function(el) {
		var parentNode = el.parentNode,
			parentElement = null;

		if(parentNode && (parentNode.tagName || parentNode.nodeType == 1)) {
			parentElement = parentNode;
		}
		return parentElement;
	};
}