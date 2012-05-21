/*global html,isHostMethod */

/*
Description:
Relies on W3C e.target which degrades in IE8-
*/

var getEventTarget;

if(html && isHostMethod(html, 'addEventListener')) {
	getEventTarget = function(e) {
		var target = e.target;
		// Check if not an element (e.g. a text node)
		if (1 != target.nodeType) {
			// Set reference to parent node (which must be an element)
			target = target.parentNode;
		}
		return target;
	};
}