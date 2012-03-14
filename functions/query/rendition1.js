var query;

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector) {
		return toArray(globalDocument.querySelectorAll(selector));
	};
};