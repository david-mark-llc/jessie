(function(global) {
	
	var document = global.document;

	var htmlElement = (function() {
		var htmlElement = null;
		if(isHostObjectProperty(document, "documentElement")) {
			htmlElement = document.documentElement;
		}
		return htmlElement;
	})();