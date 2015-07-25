var isOwnProperty;

/*
Description:
Wide support.
*/

/*
Author:
David Mark
*/

isOwnProperty = function(o, p) {
	var prop = o.constructor.prototype[p];
	return typeof prop == 'undefined' || prop !== o[p];
};