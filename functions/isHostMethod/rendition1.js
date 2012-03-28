function isHostMethod(object, method) {
	var type = typeof object[method];
	// Must check object[method] as typeof null is "object"
	return !!((type == "function" || type == "object" && object[method]) || type == 'unknown');
};