/*global canCall */

/*
Description:
Relies on `Function.prototype.bind`
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Chrome 6, Firefox 3.6, Safari 5.1, Opera 11.5
*/

/*
Author:
David Mark
*/

var bind;

if(Function.prototype.bind){
    bind = function(fn, thisObject) {
        return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
    };
}
