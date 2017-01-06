/*global canCall */

/*
Description:
Cutting edge, relies on `Array.prototype.slice`
*/

/*
Author:
David Mark
*/

var toArray;

if (canCall && Array.prototype.slice) {
        try {
                Array.prototype.slice.call(document.childNodes);
                toArray = function(a) {
                        return Array.prototype.slice.call(a);
                };
        } catch(e) {}
}
