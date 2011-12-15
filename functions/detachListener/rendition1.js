/*

Degrades in IE 8- 

*/
if(html && isHostMethod(html, 'removeEventListener')) {
	var detachListener = function(el, eventType, fn) { 
		el.removeEventListener(eventType, fn, false); 
	}; 
}