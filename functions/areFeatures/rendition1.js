/*
Description:

*/

/*
Degrades:
In browsers without a while loop
*/

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