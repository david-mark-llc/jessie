/*
Description:
Cutting edge. Relies on `Array.prototype.some`.
*/

/*
Degrades:
IE8
*/

/*
Author:
Graham Veal
*/

var some;

if(Array.prototype.some) {
	some = function(arr, iterator, context) {
		return arr.some(iterator, context);
	};
}