var mixin;

/*
Description:
Relies on `jessie.isOwnProperty`
*/

/*
Degrades:
*/

// TODO: Test the old iteration bug with shadowed built-in properties (e.g. toString)
//       Need another iteration that handles that bug

if(jessie.isOwnProperty) {
	mixin = function(target, source) {
		for(var property in source) {
			if(jessie.isOwnProperty(source, property)) {
				target[property] = source[property];
			}
		}
	};
}