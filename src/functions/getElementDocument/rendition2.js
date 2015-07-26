var getElementDocument;

/*
Description:
Wide support.
*/

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