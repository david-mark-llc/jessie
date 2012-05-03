isHostMethod = function(object, method) {
	var type = typeof object[method];
	return	type == 'function' ||
			type == 'object' && !!object[method] ||
			type == 'unknown';
};