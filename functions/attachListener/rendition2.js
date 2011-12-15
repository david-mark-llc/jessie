/*

Works in IE 8-

*/

if(html && isHostMethod(html, 'attachEvent')) {
	var attachListener = function(el, eventType, fn) { 
		el.attachEvent('on'+eventType, fn); 
	};
}