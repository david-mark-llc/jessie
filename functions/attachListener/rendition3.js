/*global html,isHostMethod*/

/*
Description:
Both W3C and MS implementation therefore providing the greatest browser support
*/

/*
Support:
IE6+, Chrome, Firefox, Opera
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

		// Discard unneeded references
		// Prevents circular references with host objects (e.g. the element)
		// Prevents IE leaks related to such circular references
		// No unload event cleanup required
		el = null;

		return listener;
	};
}