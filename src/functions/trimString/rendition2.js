/*global */

var trimString;

/*
Description:
Wide support. Relies on `String.prototype.replace`
*/

/*
Degrades in:
Not sure yet
*/

trimString = function(s) {
	return s.replace(/^\s+|\s+$/g, '');
};