/*global */

var trimString;

/*
Description:

*/

trimString = function(s) {
	return s.replace(/^\s+/, '').replace(/\s+$/, '');
};