/*global */

var trimString;

/*
Description:
Not sure what this is?
*/

trimString = function(s) {
	return s.replace(/^\s+/, '').replace(/\s+$/, '');
};