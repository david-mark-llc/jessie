/*
	Combining rendition1 and rendition2 for users who want to support
	IE8- but don't want seperate files included with conditional comments
*/

var detachListener;

if(html && isHostMethod(html, 'removeEventListener')) {
	detachListener = function(el, eventType, fn) { 
		el.removeEventListener(eventType, fn, false); 
	}; 
}
else if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) { 
		el.detachEvent('on'+eventType, fn);
	}; 
}