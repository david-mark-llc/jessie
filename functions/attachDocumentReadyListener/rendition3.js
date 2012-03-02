// Works in IE8-

var attachDocumentReadyListener
	readyListenerAttached;

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
};