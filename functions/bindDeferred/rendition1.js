/*global canCall,bind,global,isHostMethod */

/*
Description:
Relies on `Function.prototype.apply`, `Array.prototype.slice`,
`Array,prototype.concat`, `window.setTimeOut` and `window.clearTimeout`
*/

/*
Author:
David Mark
*/

var bindDeferred;

if(canCall && Array.prototype.slice && Array.prototype.concat && isHostMethod(global, 'setTimeout')) {
  bindDeferred = function(fn, context, delay) {
    var timeout;
    fn = bind.apply(this, [fn, context].concat(Array.prototype.slice.call(arguments, 3)));
      return function() {
        if (timeout) {
            global.clearTimeout(timeout);
            timeout = 0;
        }
        var args = Array.prototype.slice(arguments, 0);
        timeout = global.setTimeout(function() {
            fn.apply(this, args);
        }, delay);
      };
  };
}