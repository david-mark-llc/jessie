/* */

var getElementDocument

/* 
 * 
 * getElementDocument
 * 
 * Description:
 * 
 */

if (isHostObjectProperty(html, 'ownerDocument')) {
    getElementDocument = function(el) {
        return el.ownerDocument;
    };
}