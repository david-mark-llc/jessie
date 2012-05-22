/*global every,toArray */

/*
Description:
Relies on `jessie.every` and `jessie.toArray`
*/
var areFeatures;

if(every && toArray) {
	areFeatures = function() {
		return every(toArray(arguments), function(v){ return v; });
	};
}