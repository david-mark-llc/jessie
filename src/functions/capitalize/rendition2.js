/*
Description:
Avoids string concantenation (for what that's worth). Relies on `String.prototype.replace` that accepts Function object reference for second argument
*/

/*
Degrades in:
IE4, NN4
*/

/*
Author:
David Mark
*/

var capitalize;

// Create function scope to hide variables that are exclusive to this function
(function() {

	// Create test function

	var fn = function(n) { return n; };

	// Override String.prototype.toString to return 'n'

	fn.toString = function() {
		return 'n';
	};

	// Ancient browsers will call toString method on second parameter if not a string

	// If...

	if ('n' != 'y'.replace(/./, fn)) {
		capitalize = function(text) {
			return text.replace(/^(.)/, function(s, m) { return m.toUpperCase() });
		};
	}
})();