/*global */

var trimString;

/*
Description:
Wide support, cutting edge where possible
*/

if (String.prototype.trim) {
	trimString = function(s) {
		return s.trim();
	};
} else {
	trimString = function(s) {
		return s.replace(/^\s+|\s+$/g, '');
	};
}