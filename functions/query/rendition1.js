/*global globalDocument,isHostMethod,toArray */

/*
Description:
Relies on document.querySelectorAll and jessie.toArray and is for newer browsers
*/

var query;

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector, doc) {
		return toArray((doc || document).querySelectorAll(selector));
	};
}