/*global globalDocument, isHostObjectProperty*/

var getElementParentElement;

/*
Description:
Relies on `el.parentElement`
*/

/*
Degrades:
IE3
*/

if(globalDocument && isHostObjectProperty( globalDocument, 'head' ) && isHostObjectProperty(globalDocument.head, 'parentElement')) {
	getElementParentElement = function(el) {
		return el.parentElement;
	};
}