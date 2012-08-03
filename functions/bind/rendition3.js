/*global canCall */

/*
Description:
Both W3C and MS implementation therefore providing the greatest browser support
*/

/*
Degrades:
IE5
*/

var bind;

if(canCall && Function.prototype.bind){
    bind = function(fn, thisObject) {
        return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
    };
} else if(canCall && Array.prototype.slice) {
  bind = function(fn, context) {
    var prependArgs = Array.prototype.slice.call(arguments, 2);

    if (prependArgs.length) {
      return function() {
        fn.apply(context, Array.prototype.concat.apply(prependArgs, arguments));
      };
    }
    return function() {
      fn.apply(context, arguments);
    };
  };
}