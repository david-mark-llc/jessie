/*global canCall,forEach */

/*
Description:
Relies on `Array.prototype.every` or `Function.prototype.call` and `jessie.forEach` which provides the widest support
*/

var every;

if(Array.prototype.every) {
	every = function(arr, iterator, context) {
		return arr.every(iterator, context);
	};
} else if(canCall && forEach) {
	every = function(arr, iterator, context) {
		var result = true;
		// TODO: this is slightly inefficient, as it doesn't break out of the
		// loop when the first `falsy` value is encountered
		forEach(arr, function(value, index, list) {
			result = result && iterator.call(context, value, index, list);
		});

		return !!result;
	};
}