/*
	Combining rendition1 and rendition2 for users who want to support
	IE8- but don't want seperate files included with conditional comments
*/


var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) { 

		var listener = function(e) {
			fn.call(e, e);
		};

		el.addEventListener(eventType, listener, false); 

		return listener;
	};
} 
else if(html && isHostMethod(html, 'attachEvent')) {
	attachListener = function(el, eventType, fn) { 

		var listener = function() {
			var e = window.event;
			fn.call(e, e);
		};

		el.attachEvent('on'+eventType, listener); 

		return listener;
	};
}