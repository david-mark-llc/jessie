/*global detachListener:true,html,isHostMethod */
// Degrades in IE 8-

var detachListener;

if(html && isHostMethod(html, 'removeEventListener')) {
	detachListener = function(el, eventType, fn) {
		el.removeEventListener(eventType, fn, false);
	};
}