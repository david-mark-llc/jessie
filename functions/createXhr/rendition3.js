/*global createXhr:true,isHostMethod,global */
// for fully patched Win2k SP4 and up

if(isHostMethod(global, 'ActiveXObject')) {
	try {
		if(new global.ActiveXObject('Msxml2.XMLHTTP.3.0')) {
			createXhr = function() {
				return new global.ActiveXObject('Msxml2.XMLHTTP.3.0');
			};
		}
	}
	catch(e) {}
}