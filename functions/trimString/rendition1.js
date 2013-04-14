/*global  */

var trimString;

/*
Description:
Relies on 'String.prototype.trim'
Degrades in IE8
*/

if (String.prototype.trim) {
	trimString = function(s) {
		return s.trim();
	};
}