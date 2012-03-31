var query;

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector) {
		return toArray(document.querySelectorAll(selector));
	};
};