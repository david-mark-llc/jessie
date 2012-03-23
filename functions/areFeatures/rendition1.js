var areFeatures;

areFeatures = function() {
	var i = arguments.length;
	while (i--) {
		if (!arguments[i]) {
			return false;
		}
	}
	return true;
};