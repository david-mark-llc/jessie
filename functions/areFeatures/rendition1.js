/*global areFeatures:true,every,toArray */

var areFeatures;

areFeatures = function() {
	return every(toArray(arguments), function(v){ return v; });
};