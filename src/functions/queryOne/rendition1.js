/*global globalDocument,isHostMethod */

/*
Description:
Relies on `document.querySelector`
*/

/*
Author:
Christopher Thorn
*/

var queryOne;

if(globalDocument && isHostMethod(globalDocument, 'querySelector')) {
    queryOne = function(selector, doc) {
        return (doc || document).querySelector(selector);
    };
}