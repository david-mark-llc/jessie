(function(global) {
	
	var globalDocument = global.document,
		html,
		canCall = !!Function.prototype.call
		isStyleCapable;

	
	if(isHostObjectProperty(globalDocument, 'documentElement') {
		html = globalDocument.documentElement;
	}

	isStyleCapable = !!(html && isHostObjectProperty(html, 'style'));