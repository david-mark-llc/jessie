/*global global,globalDocument,isHostMethod */

/*
Description:
Relies on `document.addEventListener`.
*/

/*
Degrades:
TBC
*/

var attachDocumentListener;

if(globalDocument && isHostMethod(globalDocument, 'addEventListener')) {
	attachDocumentListener = function(eventType, fn) {
		
		var listener = function(e) {
			fn.call(e, e);
		};

		document.addEventListener(eventType, listener, false);

		return listener;
	};
}