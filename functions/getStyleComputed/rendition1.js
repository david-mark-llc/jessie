// No "float" styles 
// Requires camel-case style names 
// Fades away in IE 8- and compatibility modes 

var getStyleComputed;

if (isHostObjectProperty(globalDocument, 'defaultView' && isHostMethod(globalDocument.defaultView, 'getComputedStyle') { 
	getStyleComputed = function(el, style) { 
		return document.defaultView.getComputedStyle(el, null)[style]; 
	}; 
}