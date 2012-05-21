var every;

/*
Description:
Relies on Array.prototype.every which is a newer feature
*/

if(Array.prototype.every) {
	every = function(arr, iterator, context) {
		return arr.every(iterator, context);
	};
}