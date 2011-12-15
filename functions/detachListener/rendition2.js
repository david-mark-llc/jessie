/*

Works in IE 8- 

*/
if(html && isHostMethod(html, 'detachEvent')) {
	var detachListener = function(el, eventType, fn) { 
		el.detachEvent('on'+eventType, fn);
	}; 
}