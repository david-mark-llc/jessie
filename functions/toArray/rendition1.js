/*global toArray:true */

if(!toArray) {
	toArray = function(a) {
		var result = [];
		for (var i = 0, l = a.length; i < l; i++) {
			result[i] = a[i];
		}
		return result;
	};
}