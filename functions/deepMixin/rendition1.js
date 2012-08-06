var deepMixin;

/*
Description:
Relies on `jessie.isOwnProperty`
*/

/*
Degrades:
*/

if(Object.prototype.hasOwnProperty) {
	deepMixin = function(target, source) {
		for(var property in source) {
			if(!jessie.isOwnProperty(target, property)) {
				target[property] = source[property];
			} else {
				deepMixin(target[property], source[property]);
			}
		}
	};
}