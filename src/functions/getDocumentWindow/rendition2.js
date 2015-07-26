
var getDocumentWindow;

/*
Description:
Uses `document.parentWindow` where possible, otherwise `document.defaultView`
*/

/*
Degrades:
IE3
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