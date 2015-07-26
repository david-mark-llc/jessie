/*global inherit, fillin */

var inheritAndFillin;

/*
Description:
Wide support
*/

if (inherit && fillin) {
	inheritAndFillin = function(sub, super, fillin) {
		inherit(sub, super);
		fillin(sub.prototype, fillin);
	};
}