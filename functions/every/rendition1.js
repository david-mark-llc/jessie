/*global every:true,forEach */

var every;

if(Array.prototype.every) {
	every = function(arr, iterator, context) {
		return arr.every(iterator, context);
	};
}