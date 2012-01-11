/*

Works in IE 8-

This can be included with a conditional comment

*/

var attachListener;

if(html && isHostMethod(html, 'attachEvent')) {
	attachListener = function(el, eventType, fn) { 
		el.attachEvent('on'+eventType, fn); 
	};
}