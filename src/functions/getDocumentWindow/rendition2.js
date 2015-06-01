/* */

var getDocumentWindow;

/*
 * getDocumentWindow
 * 
 * Description:
 * 
 * Degrades in: IE3
 * 
 */

getDocumentWindow = (function() {    
    if (isHostObjectProperty(document, 'parentWindow')) {
        return function(doc) {
            return (doc || document).parentWindow;
        };
    }
    
    if (isHostObjectProperty(document, 'defaultView') && document.defaultView === this) {
        return function(doc) {
            return (doc || document).defaultView;
        };
    }
})();