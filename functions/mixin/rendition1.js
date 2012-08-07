/*global isOwnProperty */

var mixin;

/*
Description:
Relies on `jessie.isOwnProperty`
*/

/*
Degrades:
*/

if(isOwnProperty) {
	mixin = function(target, source) {
		for(var property in source) {
			if(isOwnProperty(source, property)) {
				target[property] = source[property];
			}
		}
	};
}