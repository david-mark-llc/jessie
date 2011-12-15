/*

Works in IE 8-

*/

var attachListener;

if(html && isHostMethod(html, 'attachEvent')) {
	attachListener = function(el, eventType, fn) { 
		el.attachEvent('on'+eventType, fn); 
	};
}