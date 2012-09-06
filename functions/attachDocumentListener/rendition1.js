/*global global,globalDocument,isHostMethod */

/*
Description:
Relies on `document.addEventListener`.
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3
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