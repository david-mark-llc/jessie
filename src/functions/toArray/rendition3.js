/*global canCall */

/*
Description:
Cutting edge where possible, wide support
*/

/*
Author:
Graham Veal
*/

var toArray;

if (canCall && Array.prototype.slice) {

	try {

		Array.prototype.slice.call(arguments, 0);

		toArray = function(a) {

			return Array.prototype.slice.call(a, 0);
		};

	} catch(e) {}

}

if (!toArray) {

	toArray = function(a) {

		var result = [],
			i = 0,
			l = a.length;

		for ( ; i < l; i++) {

			result[i] = a[i];
		}

		return result;
	};
}
