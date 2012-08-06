var isOwnProperty;

isOwnProperty = function(o, p) {
	var prop = o.constructor.prototype[p];
	return typeof prop == 'undefined' || prop !== o[p];
};