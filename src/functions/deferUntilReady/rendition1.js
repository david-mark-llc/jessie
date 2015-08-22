/*global isHostMethod,global */

/*
Description:
Cutting edge (W3 compliant). Best used with asset-light documents. No frames or other alternate windows
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3
*/

/*
Author:
David Mark
*/

var deferUntilReady;

var readyListenerAttached;

if(isHostMethod(global, "addEventListener")) {
	deferUntilReady = function(fn) {

		/*SCAFFOLDING:Start*/
		if(readyListenerAttached) {
			throw new Error("One too many ready listeners. Use a queue!");
		}
		/*SCAFFOLDING:End*/

		readyListenerAttached = true;

		// Production function starts (and ends) here
		window.addEventListener('load', fn, false);
	};
}