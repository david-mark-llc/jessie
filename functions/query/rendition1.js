/*global query:true,globalDocument,isHostMethod,toArray */

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector) {
		return toArray(document.querySelectorAll(selector));
	};
}