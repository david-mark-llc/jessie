/*global cloneObject*/

/*
Description:
Wide support
*/

/*
Author:
David Mark
*/

var inherit;

if(cloneObject) {
	inherit = (function() {
		return function(fnSub, fnSuper) {
			// Set "sub" constructor prototype to a clone of the "super" constructor prototype
			fnSub.prototype = cloneObject(fnSuper.prototype);

			// Store this handy reference so methods can call on their super-predecessors
			fnSub.superConstructor = fnSuper;

			// Restore stepped on constructor property
			fnSub.prototype.constructor = fnSub;
		};
	})();
}