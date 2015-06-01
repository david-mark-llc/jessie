/*global html,isHostObjectProperty*/

/*
Description:
Relies on `el.ownerDocument`
*/

/*
Author:
David Mark
*/

var getOwnerDocument;

if(html && isHostObjectProperty(html, 'ownerDocument')) {
	getOwnerDocument = function(el) {
		return el.ownerDocument;
	};
}