/*
Description:
Wide support, no cutting edge
*/

/*
Author:
David Mark
*/

var toArray;

toArray = function(a) {
	var result = [];
	for (var i = 0, l = a.length; i < l; i++) {
		result[i] = a[i];
	}
	return result;
};