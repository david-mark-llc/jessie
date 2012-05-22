/*global isHostObjectProperty,globalDocument,isHostMethod */

/*
Description:
Relies on `document.defaultView.getComputedStyle` which derades in IE8-
and compatibility modes. No float styles with this one and camel-case
names.
*/

var getStyleComputed;

if (isHostObjectProperty(globalDocument, 'defaultView') &&
	isHostMethod(globalDocument.defaultView, 'getComputedStyle')) {
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