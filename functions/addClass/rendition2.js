/*global html*/

/*
Description:
Relies on the `el.className` property (class attribute)
*/

/*
Degrades:
Unknown
*/

var addClass;

if (html && "string" === typeof html.className ) {
    addClass = function(el, className) {
      var re;
      if (!el.className) {
        el.className = className;
      }
      else {
        re = new RegExp('(^|\\s)' + className + '(\\s|$)');
        if (!re.test(el.className)) { el.className += ' ' + className; }
      }
    };
}