/*global every:true,forEach */

if(!every && forEach) {
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