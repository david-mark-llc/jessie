/*
Description:
Relies on `Array.prototype.some` for newer browsers
*/

var some;

if(Array.prototype.some) {
	some = function(arr, iterator, context) {
		return arr.some(iterator, context);
	};
}