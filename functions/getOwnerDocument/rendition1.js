/*global getOwnerDocument:true,html,isHostObjectProperty*/

var getOwnerDocument;

if(html && isHostObjectProperty(html, 'ownerDocument')) {
	getOwnerDocument = function(el) {
		return el.ownerDocument;
	};
}