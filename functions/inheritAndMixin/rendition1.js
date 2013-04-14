/*global inherit, mixin */

var inherit_and_mixin;

/*
Description:
Needs documenting
*/

if (inherit && mixin) {
	inherit_and_mixin = function(sub, super, mixin) {
		inherit(sub, super);
		mixin(sub.prototype, mixin);	
	};
}