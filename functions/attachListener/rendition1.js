/*

Degrades in IE 8- 

*/

var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) { 
		el.addEventListener(eventType, fn, false); 
	};
}