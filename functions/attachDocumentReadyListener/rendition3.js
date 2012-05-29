/*global global,isHostMethod */
/*
Description:
Relies on `window.attachEvent`
*/

/*
Support:
IE9+,Opera 8+,Chrome, FF, Safari
*/
var attachDocumentReadyListener;

var readyListenerAttached;

if(isHostMethod(global, "attachEvent")) {
	attachDocumentReadyListener = function(fn) {
		
		// Remove this "scaffolding" on deployment
		if(readyListenerAttached) {
			throw new Error("One too many ready listeners. Use a queue!");
		}
		readyListenerAttached = true;
		
		// Production function starts (and ends) here
		window.attachEvent('load', fn, false);
	};
}