/*global global,isHostMethod*/

/*
Description:
Relies on window.XMLHttpRequest which is for newer browsers
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