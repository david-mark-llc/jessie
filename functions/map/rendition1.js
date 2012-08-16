/*
Description:
Uses 'Array.prototype.map'
*/

/*
Degrades:
IE8, Chrome 6, Firefox 3, Safari 4.1.3, Opera 10
*/

var map;

if(Array.prototype.map){
    map = function(array, callback, thisObject) {
        array.map(callback));
    };
}