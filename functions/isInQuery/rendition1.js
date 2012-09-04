/*global query */

/*
Description:
Relies on `jessie.query`
*/

var isInQuery;

if(query) {
	isInQuery = function(el, selector, context) {
		var isInQuery = false,
			queryElements = query(selector, context),
			i;

		// could use Array.prototype.indexOf in another rendition
		for(i = 0; i < queryElements.length; i++) {
			if(queryElements[i] === el) {
				isInQuery = true;
				break;
			}
		}

		return isInQuery;
	};
}