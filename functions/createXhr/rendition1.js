/*global global,isHostMethod*/

/*
Description:
Relies on W3C `window.XMLHttpRequest`
*/

/*
Degrades:
IE7+, Chrome, Firefox, Safari
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