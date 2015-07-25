/*global */

var trimString;

/*
Description:
Not sure what this is?
*/

trimString = function(s) {
	return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};