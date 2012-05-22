/*global global,isHostMethod */

/*
Description:
Relies on `window.addEventListener` which degrades in IE8- and older browsers that lack this method. No frames.
*/

var attachWindowListener;

if(global && isHostMethod(global, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment - for debugging only
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function(e) {
			fn.call(e, e);
		};

		global.addEventListener(eventType, listener, false);

		return listener;
	};
}