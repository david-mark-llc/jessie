/*global html,isHostMethod */
/*
Description:
Relies on W3C `el.addEventListener` which degrades in IE8 and below
*/

/*
Support:
IE9+, Chrome, FireFox
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