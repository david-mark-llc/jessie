/* */

var htmlToNodes;

/*
 * htmlToNodes
 * 
 * Relies on 'jessie.setHtml' and 'jessie.createElement'
 * 
 */

if (setTempHtml && createElement) {
    htmlToNodes = function(html, docNode) {
        var c;
        
        elTemp = createElement('div', docNode);
        
        if (elTemp) {
            setTempHtml(html);
            c = elTemp.childNodes;
            elTemp = null;
        }
        
        return c;
    };
}