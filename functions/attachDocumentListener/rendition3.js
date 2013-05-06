/*global global,globalDocument,isHostMethod,attachListener */

/*
Description:
Relies on `document.addEventListener` or `document.attachEvent` providing the widest support.
*/

/*
Degrades:
IE4, IE3
*/

var attachDocumentListener;

if(globalDocument && isHostMethod(globalDocument, 'addEventListener') && attachListener) {
	attachDocumentListener = function(eventType, fn) {

		var listener = function(e) {
			fn.call(document, e);
		};

		return attachListener(document, eventType, fn);
	};
} else if(globalDocument && isHostMethod(globalDocument, 'attachEvent') && attachListener) {
	attachDocumentListener = function(eventType, fn) {

		var listener = function(e) {
			fn.call(document, e);
		};

		return attachListener(document, eventType, fn);
	};
}