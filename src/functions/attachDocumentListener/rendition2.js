/*global global,globalDocument,isHostMethod,attachListener */

/*
Description:
Cutting edge (W3 compliant) and handles Microsoft event model. Wide support.
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