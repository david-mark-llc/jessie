/*global canCall */

/*
Description:
Relies on `Array.forEach` or `Function.prototype.call` providing greatest browser support
*/

var forEach;

if (Array.prototype.forEach) {
	forEach = function(elements, callback, thisObject) {
		elements.forEach(callback, thisObject);
	};
}else if (canCall) {
	forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			callback.call(thisObject, elements[i], i, elements);
		}
	};
}