var getElementDocument;

/*
Description:
Wide support. Cutting edge where possible.
*/

if (isHostObjectProperty(html, 'ownerDocument')) {
    getElementDocument = function(el) {
        return el.ownerDocument;
    };
} else {
    getElementDocument = function(el) {
        if (el.parentNode) {
            while (el.parentNode) {
                el = el.parentNode;
            }
            if (el.nodeType == 9 || (!el.nodeType && !el.tagName)) {
                return el;
            }
        }

        return null;
    }
}