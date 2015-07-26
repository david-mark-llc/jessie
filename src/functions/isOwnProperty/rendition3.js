var isOwnProperty;

/*
Description:
Wide support. Cutting edge where possible.
*/

/*
Author:
David Mark
*/

if(Object.prototype.hasOwnProperty) {
	isOwnProperty = function(o, p) {
		return o.hasOwnProperty(p);
	};
}
else {
	isOwnProperty = function(o, p) {
		var prop = o.constructor.prototype[p];
		return typeof prop == 'undefined' || prop !== o[p];
	};
}