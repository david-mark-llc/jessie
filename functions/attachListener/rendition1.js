/*global html,isHostMethod */
/*
Description:
Relies on W3C `el.addEventListener`
*/

/*
Degrades:
IE8, Opera 7.6
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