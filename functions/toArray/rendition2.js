/*global canCall */

/*
Description:
Relies on `Array.prototype.slice`
*/

var toArray;

if(canCall && Array.prototype.slice) {
	try {
		Array.prototype.slice.call(arguments, 0);
		toArray = function(a) {
			return Array.prototype.slice.call(a, 0);
		};
	} catch(e) {}
}