/*global inherit, fillin */

var inherit_and_fillin;

/*
Description:
Needs documenting
*/

if (inherit && fillin) {
	inherit_and_fillin = function(sub, super, fillin) {
		inherit(sub, super);
		fillin(sub.prototype, fillin);	
	};
}