/*global global,globalDocument,isHostMethod,attachListener */

/*
Description:
Relies on `document.attachEvent`.
*/

/*
Degrades:
IE10, IE9, IE4, IE3, Opera 8+, Chrome, FF, Safari
*/

var attachDocumentListener;

if(globalDocument && isHostMethod(globalDocument, 'attachEvent') && attachListener) {
	attachDocumentListener = function(eventType, fn) {

		var listener = function(e) {
			fn.call(document, e);
		};

		return attachListener(document, eventType, fn);
	};
}