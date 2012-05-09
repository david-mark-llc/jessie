/*global every:true,forEach */
if(Array.prototype.every) {
	every = function(obj, iterator, context) {
		if(obj == null) return true;
		return obj.every(iterator, context);
	};
}