/*
Description:
Cutting edge only, this function is because native versions are inconsistent
*/

/*
Author:
David Mark
*/

var push = function(a) {
	var i = 1, l = arguments.length;
	var len = a.length >>> 0;
	while (i < l) {
	  a[len] = arguments[i++];
	  len = len + 1 >>> 0;
	}
	return a.length;
};