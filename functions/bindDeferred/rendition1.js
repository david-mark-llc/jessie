/*global canCall,bind,global */

/*
Description:
Relies on Function.prototype.apply.
*/

var bindDeferred;

if(canCall) {
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