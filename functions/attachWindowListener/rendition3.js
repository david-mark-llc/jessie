/*global global,isHostMethod */

/*
Description:
Relies on `window.addEventListener` or `window.attachEvent` No frames.
*/

/*
Degrades:
IE4, NN4
*/

var attachWindowListener;

if(window && isHostMethod(window, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment - for debugging only
		if (!(/^(load|scroll|resize|orientationchange|unload|beforeunload)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function(e) {
			fn.call(window, e);
		};

		window.addEventListener(eventType, listener, false);

		return listener;
	};
} else if(window && isHostMethod(window, 'attachEvent')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment -- for debugging only
		if (!(/^(load|scroll|resize|orientationchange|unload|beforeunload)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function() {
			var e = window.event;
			fn.call(window, e);
		};

		window.attachEvent('on'+eventType, listener);

		return listener;
	};
}