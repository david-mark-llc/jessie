var mixin;

/*
Description:
Relies on `jessie.isOwnProperty`
*/

/*
Degrades:
*/

if(jessie.isOwnProperty) {
	mixin = function(target, source) {
		for(var property in source) {
			if(jessie.isOwnProperty(source, property)) {
				target[property] = source[property];
			}
		}
	};
}