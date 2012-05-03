/*

Degrades in IE 8-

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
};