/*

Degrades in IE 8- 

*/

if(html && isHostMethod(html, 'addEventListener')) {
	var attachListener = function(el, eventType, fn) { 
		el.addEventListener(eventType, fn, false); 
	};
}