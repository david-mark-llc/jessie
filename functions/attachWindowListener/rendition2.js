/*global global,isHostMethod */

/*
Description:
Relies on `window.attachEvent`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var attachWindowListener;

if(window && isHostMethod(window, 'attachEvent')) {
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