/*global window,isHostMethod */

/*
Description:
Cutting edge. No frames.
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
*/

/*
Author:
David Mark
*/

var attachWindowListener;

if(window && isHostMethod(window, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {

		/*SCAFFOLDING:Start*/
		if (!(/^(load|scroll|resize|orientationchange|unload|beforeunload)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		/*SCAFFOLDING:End*/

		var listener = function(e) {
			fn.call(window, e);
		};

		window.addEventListener(eventType, listener, false);

		return listener;
	};
}