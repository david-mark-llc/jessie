(function(global) {
	
	var globalDocument = global.document,
		isHostObjectProperty = function(object, property) {
			var objectProperty = object[property];
			return typeof objectProperty == 'object' && objectProperty;
		},
		isHostMethod = function(object, method) {
			var objectMethod = object[method];
			var type = typeof objectMethod;
			return	type == 'function' ||
					type == 'object' && null !== objectMethod ||
					type == 'unknown';
		},
		html = isHostObjectProperty(globalDocument, 'documentElement'),
		canCall = !!Function.prototype.call;

