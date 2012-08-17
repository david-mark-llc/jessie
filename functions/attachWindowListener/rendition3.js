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

if(global && isHostMethod(global, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment - for debugging only
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function(e) {
			fn.call(global, e);
		};

		global.addEventListener(eventType, listener, false);

		return listener;
	};
} else if(global && isHostMethod(global, 'attachEvent')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment -- for debugging only
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function() {
			var e = window.event;
			fn.call(global, e);
		};

		global.attachEvent('on'+eventType, listener);

		return listener;
	};
}