var mixin;

/*
Description:
Relies on `Object.prototype.hasOwnProperty`
*/

/*
Degrades:
In browsers without `Object.prototype.hasOwnProperty`
*/

if(Object.prototype.hasOwnProperty) {
	mixin = function(target, source) {
		for(var property in source) {
			if(!target.hasOwnProperty(property)) {
				target[property] = source[property];
			} else {
				mixin(target[property], source[property]);
			}
		}
	};
}