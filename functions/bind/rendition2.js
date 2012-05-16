/*global canCall */

var bind;

if(canCall && Array.prototype.slice) {
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