/*
Description:
Needs documenting
*/

/*
Author:
David Mark
*/

var cloneObject;

cloneObject = (function() {
	var Fn = function() {};

	return function(o) {
		Fn.prototype = o;
		return new Fn();
	};
})();