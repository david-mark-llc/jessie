var getElementDocument;

/*
Description:
Relies on document.documentElement.ownerDocument
*/

if (isHostObjectProperty(html, 'ownerDocument')) {
    getElementDocument = function(el) {
        return el.ownerDocument;
    };
}