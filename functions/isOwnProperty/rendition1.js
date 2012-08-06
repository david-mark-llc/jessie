var isOwnProperty;

if(Object.prototype.hasOwnProperty) {
	isOwnProperty = function(o, p) {
		return o.hasOwnProperty(p);
	};
}