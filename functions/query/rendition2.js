/*global query:true,globalDocument,isHostMethod,toArray */

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector, doc) {
		return toArray((doc || document).querySelectorAll(selector));
	};
}