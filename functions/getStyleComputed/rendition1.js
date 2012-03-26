// No "float" styles 
// Requires camel-case style names 
// Fades away in IE 8- and compatibility modes 

var getStyleComputed;

if (isHostObjectProperty(globalDocument, 'defaultView') && isHostMethod(globalDocument.defaultView, 'getComputedStyle')) { 
	getStyleComputed = function(el, style) { 
		
		if (style.indexOf('-') != -1) {
			throw new Error('Camel-case style names, please.');
		}

		if (style == 'float') {
			throw new Error('The "float" style is not supported by this rendition.');
		}
		
		if (el.style.display == 'none') {
			throw new Error('Element not in layout. Cannot compute styles.');
		}
		
		return document.defaultView.getComputedStyle(el, null)[style]; 
	}; 
}