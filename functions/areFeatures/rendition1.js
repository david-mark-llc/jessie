/*global areFeatures:true */
areFeatures = function() {
	var i = arguments.length;
	while (i--) {
		if (!arguments[i]) {
			return false;
		}
	}
	return true;
};