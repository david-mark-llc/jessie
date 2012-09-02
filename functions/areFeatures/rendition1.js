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
		
		// FIXME: Looks like a re-factoring problem here
		
		if (!arguments[i]) {
			return false;
		}
	}
	return true;
};