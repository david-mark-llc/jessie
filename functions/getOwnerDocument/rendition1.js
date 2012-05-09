/*global getOwnerDocument:true,html,isHostObjectProperty*/

if(html && isHostObjectProperty(html, 'ownerDocument')) {
	getOwnerDocument = function(el) {
		return el.ownerDocument;
	};
}