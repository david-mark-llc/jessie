/*
	Combining rendition1 and rendition2 for users who want to support
	IE8- but don't want seperate files included with conditional comments
*/


var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) { 
		el.addEventListener(eventType, fn, false); 
	};
} 
else if(html && isHostMethod(html, 'attachEvent')) {
	attachListener = function(el, eventType, fn) { 
		el.attachEvent('on'+eventType, fn); 
	};
}