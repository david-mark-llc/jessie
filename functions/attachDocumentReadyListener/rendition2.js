// Degrades in IE 8- 
// No frames or other alternate windows

var attachDocumentReadyListener, 
	readyListener, 
	readyListenerAttached,
	documentIsReady; 

if (isHostMethod(global, "addEventListener") && isHostMethod(globalDocument, "addEventListener")) { 
	attachDocumentReadyListener = function(fn) { 

		// Remove this "scaffolding" on deployment 
		if (readyListenerAttached) { 
			throw new Error('One too many ready listeners. Use a queue!'); 
		} 

		readyListenerAttached = true; 

		// Production function starts here 

		// Run on first fired event 
		readyListener = function() { 
			if (!documentReady) { 
				documentReady = true; 
				fn(); 
			} 
		}; 

		global.addEventListener('load', readyListener, false); 
		globalDocument.addEventListener('DOMContentLoaded', readyListener, false); 
	}; 
};