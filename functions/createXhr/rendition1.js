/*global createXhr:true,global,isHostMethod*/
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