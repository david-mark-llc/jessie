/*
Description:
Cutting edge (W3 compliant) where possible, also handles Microsoft event model. Widest support.
*/

/*
See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/uUsSVH7Vcvg">Article</a>
If you will be using a forked rendition to support IE 8-
*/

/*
Degrades:
IE4, IE3, NN4
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
} else if(html && isHostMethod(html, 'attachEvent')) {
	getEventTarget = function(e) {
		return e.srcElement;
	};
}