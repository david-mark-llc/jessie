/*global */

var trimString;

/*
Description:
Fork of 1 and 2
*/

if (String.prototype.trim) {
	
	// Rendition 1
	
	trimString = function(s) {
		return s.trim();
	};
} else {
	
	// Rendition 2
	
	trimString = function(s) {
		return s.replace(/^\s+|\s+$/g, '');
	};
}