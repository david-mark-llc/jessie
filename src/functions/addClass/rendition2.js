/*global html*/

/*
Description:
Wide support, no cutting edge
*/

/*
Degrades:
IE4, IE3
*/

/*
Author:
David Mark
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