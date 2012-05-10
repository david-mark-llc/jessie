/*global every:true,forEach */

every = function(obj, iterator, context) {
	var result = true;
	if (obj == null) return result;

	// TODO: this is slightly inefficient, as it doesn't break out of the
	// loop when the first `falsy` value is encountered
	forEach(obj, function(value, index, list) {
		result = result && iterator.call(context, value, index, list);
	});
	return !!result;
};
