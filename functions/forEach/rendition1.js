/*
Description:
Uses Array.prototype.forEach for newer browsers
*/

var forEach;

if (Array.prototype.forEach) {
	forEach = function(elements, callback, thisObject) {
		elements.forEach(callback, thisObject);
	};
}