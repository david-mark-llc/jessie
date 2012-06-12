/*global global,isHostMethod */

/*
Description:
Relies on `window.addEventListener`. No frames.
*/

/*
Degrades:
IE8, Opera 7.6
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