/*global globalDocument,isHostMethod,toArray */

/*
Description:
Relies on `document.querySelectorAll` and `jessie.toArray`
*/

var query;

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector, doc) {
		return toArray((doc || document).querySelectorAll(selector));
	};
}