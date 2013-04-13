/*global html, isHostObjectProperty, getDescendantsByTagName*/

var getElementParentElement;

/*
Description:
Relies on 'el.parentNode' or 'el.parentElement'
Relies on 'jessie.getDescendantsByTagName'
*/

/*
Degrades:
IE3
*/

if (html && isHostObjectProperty(html, 'parentNode')) {
    getElementParentElement = function(el) {
        var parentNode = el.parentNode,
            parentElement = null;

        if (parentNode && (parentNode.tagName || parentNode.nodeType == 1)) {
            parentElement = parentNode;
        }
        return parentElement;
    };
} else if (getDescendantsByTagName && isHostObjectProperty(getDescendantsByTagName('head')[0], 'parentElement')) {
	getElementParentElement = function(el) {
		return el.parentElement;
	};
}