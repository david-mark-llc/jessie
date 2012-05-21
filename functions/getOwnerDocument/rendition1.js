/*global html,isHostObjectProperty*/

/*
Description:
Relies on el.ownerDocument
*/

var getOwnerDocument;

if(html && isHostObjectProperty(html, 'ownerDocument')) {
	getOwnerDocument = function(el) {
		return el.ownerDocument;
	};
}