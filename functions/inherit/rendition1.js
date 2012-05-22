var inherit;

/*
Description:
Needs documenting
*/

inherit = (function() {
	var Fn = function() {};
	return function(fnSub, fnSuper) {
		Fn.prototype = fnSuper.prototype;
		fnSub.prototype = new Fn();
		fnSub.superConstructor = fnSuper;
		fnSub.prototype.constructor = fnSub;
	};
})();