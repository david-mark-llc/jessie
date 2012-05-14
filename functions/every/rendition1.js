/*global every:true,forEach */
if(Array.prototype.every) {
	every = function(arr, iterator, context) {
		return arr.every(iterator, context);
	};
}