/*global html,isHostMethod */

/*
Description:
Cutting edge (W3 compliant) where possible, also handles Microsoft event model. Wide support.
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
David Mark
*/

var getEventTargetRelated;

if(html && isHostMethod(html, 'addEventListener')) {
	getEventTargetRelated = function(e) {
		var target = e.relatedTarget;
		// Check if not an element (e.g. a text node)
		if (1 != target.nodeType) {
			// Set reference to parent node (which must be an element)
			target = target.parentNode;
		}
		return target;
	};
} else if(html && isHostMethod(html, 'attachEvent')) {
	getEventTargetRelated = function(e) {
		if (e.srcElement == e.fromElement) { return e.toElement; }
		if (e.srcElement == e.toElement) { return e.fromElement; }
		return target;
	};
}