/*global html,isHostMethod */
/*
Description:
Relies on Microsoft's `el.attachEvent`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var attachListener;

if(html && isHostMethod(html, 'attachEvent')) {
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