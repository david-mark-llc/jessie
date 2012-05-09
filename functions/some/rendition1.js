/*global some:true */

if(Array.prototype.some) {
	some = function(obj, iterator, context) {
		if(obj == null) return true;
		return obj.some(iterator, context);
	};
}