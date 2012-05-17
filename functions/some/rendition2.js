/*global forEach */
var some;

if(forEach) {
	some = function(obj, iterator, context) {
		var result = false;

		// TODO: this is slightly inefficient, as it doesn't break out of the
		// loop when the first `truthy` value is encountered
		forEach(obj, function(value, index, list) {
			result = iterator.call(context, value, index, list);
		});
		return !!result;
	};
}