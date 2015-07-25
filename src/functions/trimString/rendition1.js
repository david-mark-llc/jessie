/*global  */

var trimString;

/*
Description:
Cutting edge. Relies on 'String.prototype.trim'
*/

/*
Degrades:
IE8
*/

if (String.prototype.trim) {
	trimString = function(s) {
		return s.trim();
	};
}