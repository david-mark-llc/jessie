/*

Works in IE 8-

This can be included with a conditional comment

*/

var attachListener;

if(html && isHostMethod(html, 'attachEvent')) {
	attachListener = function(el, eventType, fn) { 

		var listener = function() {
			var e = window.event;
			fn.call(e, e);
		};

		el.attachEvent('on'+eventType, listener); 

		return listener;
	};
}