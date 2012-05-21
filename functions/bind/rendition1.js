/*global canCall */

/*
Description:
Relies on Function.prototype.bind which is a newer feature
*/
var bind;

if(canCall && Function.prototype.bind){
    bind = function(fn, thisObject) {
        return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
    };
}