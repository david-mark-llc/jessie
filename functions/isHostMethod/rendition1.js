function isHostMethod(object, method) {
	var reFeaturedMethod = new RegExp('^(function|object)$', 'i');
	var type = typeof object[method];
	return !!((reFeaturedMethod.test(type) && object[method]) || type == 'unknown');
};