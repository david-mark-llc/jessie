/*global toArray:true */

if(Array.prototype.slice) {
	try {
		Array.prototype.slice.call(arguments, 0);
		toArray = function(a) {
			return Array.prototype.slice.call(a, 0);
		};
	} catch(e) {
		
	}
}