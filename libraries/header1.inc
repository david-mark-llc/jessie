(function(global) {
	
	var globalDocument = global.document,
		html,
		canCall = !!Function.prototype.call;

	
	if(isHostObjectProperty(globalDocument, 'documentElement')) {
		html = globalDocument.documentElement;
	}