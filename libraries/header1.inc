(function(global) {
	
	var globalDocument = global.document,
		isHostObjectProperty = function(object, property) {
			return !!(typeof(object[property]) == 'object' && object[property]);
		},
		html = isHostObjectProperty(globalDocument, 'documentElement') && globalDocument.documentElement,
		canCall = !!Function.prototype.call;
