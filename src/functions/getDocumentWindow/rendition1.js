/* */

var getDocumentWindow;

/*
 * getDocumentWindow
 * 
 * Description:
 * 
 * Degrades in: IE8
 * 
 */

getDocumentWindow = (function() {
    if (isHostObjectProperty(document, 'defaultView') && document.defaultView === this) {
        return function(doc) {
          return (doc || document).defaultView;
        };
    }
})();