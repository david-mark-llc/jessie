var getDocumentWindow;

/*
Description:
Cutting edge. Relies on `document.defaultView`
*/

/*
Degrades:
IE8
*/

getDocumentWindow = (function() {
    if (isHostObjectProperty(document, 'defaultView') && document.defaultView === this) {
        return function(doc) {
          return (doc || document).defaultView;
        };
    }
})();