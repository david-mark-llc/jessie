/* */

var getElementDocument;

/* 
 * 
 * getElementDocument
 * 
 * Description: Fork of #1 and #2
 * 
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