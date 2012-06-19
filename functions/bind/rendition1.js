/*global canCall */

/*
Description:
Relies on `Function.prototype.bind`
*/

/*
Degrades:
IE8, Chrome 6, Firefox 3.6, Safari 5.1, Opera 11.5
*/

var bind;

if(canCall && Function.prototype.bind){
    bind = function(fn, thisObject) {
        return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
    };
}