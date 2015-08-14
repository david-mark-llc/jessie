var jessie;
jessie = jessie || {};
(function(global) {

	var globalDocument = global.document;

	var isHostObjectProperty = function(object, property) {
		var objectProperty = object[property];
		return typeof objectProperty == 'object' && null !== objectProperty;
	};

	var isHostMethod = function(object, method) {
		var objectMethod = object[method];
		var type = typeof objectMethod;
		return	type == 'function' ||
				type == 'object' && null !== objectMethod ||
				type == 'unknown';
	};

	// Test for properties of host objects that are never callable (e.g. document nodes, elements)
	var isRealObjectProperty = function(o, p) {
	    return !!(typeof o[p] == 'object' && o[p]);
	};

	var hasFeatures = function() {
		var i = arguments.length;
		while (i--) {
			if (!jessie[arguments[i]]) {
				return false;
			}
		}
		return true;
	};

	var html = isHostObjectProperty(globalDocument, 'documentElement') && globalDocument.documentElement;

	var canCall = !!Function.prototype.call;

	var isStyleCapable = !!(html && isHostObjectProperty(html, 'style'));

