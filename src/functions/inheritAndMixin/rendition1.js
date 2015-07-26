/*global inherit, mixin */

var inheritAndMixin;

/*
Description:
Wide support
*/

if (inherit && mixin) {
	inheritAndMixin = function(sub, super, mixin) {
		inherit(sub, super);
		mixin(sub.prototype, mixin);
	};
}