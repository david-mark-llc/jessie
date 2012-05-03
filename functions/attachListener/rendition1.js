/*global attachListener:true,html,isHostMethod,html */
// Degrades in IE 8-

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) {

		var listener = function(e) {
			fn.call(e, e);
		};

		el.addEventListener(eventType, listener, false);

		return listener;
	};
}