var isOwnProperty;

/*
Description:
Cutting edge. Relises on `Object.prototype.hasOwnProperty`
*/

/*
Author:
David Mark
*/

if(Object.prototype.hasOwnProperty) {
	isOwnProperty = function(o, p) {
		return o.hasOwnProperty(p);
	};
}