/*global every,toArray */

/*
Description:
Relies on every and toArray
*/
var areFeatures;

if(every && toArray) {
	areFeatures = function() {
		return every(toArray(arguments), function(v){ return v; });
	};
}