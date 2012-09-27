/*global global,isHostMethod*/

/*
Description:
Relies on W3C `window.XMLHttpRequest`.

NOTE: IE7+ native version does not support overrideMimeType or local file
requests
*/

/*
Degrades:
IE6, IE5.5, IE5, IE4, IE3
*/

/*
Author:
David Mark
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