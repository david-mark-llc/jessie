var inherit;

/*
Description:
Very good support
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