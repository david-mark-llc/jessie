/*global isOwnProperty*/

var deepMixin;

/*
Description:
Relies on `jessie.isOwnProperty`
*/

/*
Degrades:
*/

if(isOwnProperty) {
	deepMixin = function(target, source) {
		for(var property in source) {
			if(!isOwnProperty(target, property)) {
				target[property] = source[property];
			} else {
				deepMixin(target[property], source[property]);
			}
		}
	};
}