var getElementParent;

/*
Description:
Relies on `el.parentNode`
*/

getElementParent = function(el) {
	return (el.parentNode && (el.parentNode.tagName || el.parentNode.nodeType == 1)) ? el.parentNode : (el.parentElement || null);
};