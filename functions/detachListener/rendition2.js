/*

Works in IE 8- 

*/

var detachListener;

if(html && isHostMethod(html, 'detachEvent')) {
	detachListener = function(el, eventType, fn) { 
		el.detachEvent('on'+eventType, fn);
	}; 
}