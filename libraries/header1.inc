
var jessieNamespace;
jessieNamespace = jessieNamespace || {};
(function(global) {
	
	var globalDocument = global.document,
		isHostObjectProperty = function(object, property) {
			return !!(typeof(object[property]) == 'object' && object[property]);
		},
		isHostMethod = function(object, method) {
			var type = typeof object[method];
			return	type == 'function' ||
					type == 'object' && !!object[method] ||
					type == 'unknown';
		},
		html = isHostObjectProperty(globalDocument, 'documentElement') && globalDocument.documentElement,
		canCall = !!Function.prototype.call;
