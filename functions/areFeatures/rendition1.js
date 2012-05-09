/*global areFeatures:true,every,toArray */
areFeatures = function() {
	return every(toArray(arguments), function(v){ return v; });
};