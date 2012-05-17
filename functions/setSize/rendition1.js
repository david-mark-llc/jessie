var setSize;
if(html && isHostObjectProperty(html, "style")){
  setSize = (function() {
    var px = (typeof html.style.top == 'number') ? 0 : 'px';
    return function(el, h, w) {
      if (h !== null && h >= 0) { el.style.height = h + px; }
      if (w !== null && w >= 0) { el.style.width = w + px; }
    };
  })();
}