/*
Description:
Uses `Array.prototype.forEach`
*/

var forEach;

if (Array.prototype.forEach) {
	forEach = function(elements, callback, thisObject) {
		elements.forEach(callback, thisObject);
	};
}