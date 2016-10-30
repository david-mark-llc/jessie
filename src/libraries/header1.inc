var jessie;
jessie = jessie || {};
(function(global) {

	var globalDocument = global.document,
		isHostObjectProperty = function(object, property) {
			var objectProperty = object[property];
			return typeof objectProperty == 'object' || typeof objectProperty == 'function' && null !== objectProperty;
		},
		isHostMethod = function(object, method) {
			var objectMethod = object[method];
			var type = typeof objectMethod;
			return	type == 'function' ||
					type == 'object' && null !== objectMethod ||
					type == 'unknown';
		},
		hasFeatures = function() {
			var i = arguments.length;
			while (i--) {
				if (!jessie[arguments[i]]) {
					return false;
				}
			}
			return true;
		},
		html = isHostObjectProperty(globalDocument, 'documentElement') && globalDocument.documentElement,
		canCall = !!Function.prototype.call,
		isStyleCapable = !!(html && isHostObjectProperty(html, 'style'));

