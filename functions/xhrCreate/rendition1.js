/*global global,isHostMethod*/

/*
Description:
Relies on W3C `window.XMLHttpRequest`.

NOTE: IE7+ native version does not support overrideMimeType or local file
requests
*/

/*
Degrades:
IE6
*/

var xhrCreate;

if(isHostMethod(global, "XMLHttpRequest")) {
	try {
		if(new global.XMLHttpRequest()) {
			xhrCreate = function() {
				return new XMLHttpRequest();
			};
		}
	}
	catch(e) {}
}