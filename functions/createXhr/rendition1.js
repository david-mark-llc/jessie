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

var createXhr;

if(isHostMethod(global, "XMLHttpRequest")) {
	try {
		if(new global.XMLHttpRequest()) {
			createXhr = function() {
				return new XMLHttpRequest();
			};
		}
	}
	catch(e) {}
}