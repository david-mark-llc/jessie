/*global some:true */

var some;

if(Array.prototype.some) {
	some = function(arr, iterator, context) {
		return arr.some(iterator, context);
	};
}