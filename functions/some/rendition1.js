/*global some:true */

if(Array.prototype.some) {
	some = function(arr, iterator, context) {
		return arr.some(iterator, context);
	};
}