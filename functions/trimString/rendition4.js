/*global */

var trimString;

/*
Description:

*/

trimString = function(s) {
	return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};