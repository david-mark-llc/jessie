/*global global,isHostMethod */

/*
Description:
Relies on `window.attachEvent`
*/

/*
Degrades:
IE10, IE9, IE4, IE3, Opera 8+,Chrome, FF, Safari
*/

/*
Author:
David Mark
*/

var attachWindowListener;

if(window && isHostMethod(window, 'attachEvent')) {
	attachWindowListener = function(eventType, fn) {
		
		/*SCAFFOLDING:Start*/
		if (!(/^(load|scroll|resize|orientationchange|unload|beforeunload)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		/*SCAFFOLDING:End*/
		
		var listener = function() {
			var e = window.event;
			fn.call(window, e);
		};

		window.attachEvent('on'+eventType, listener);

		return listener;
	};
}