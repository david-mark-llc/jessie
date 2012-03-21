// for fully patched Win2k SP4 and up 

var createXhr;

if(!createXhr && isHostMethod(global, 'ActiveXObject')) {
	try {
		if(new global.ActiveXObject('Msxml2.XMLHTTP.3.0')) {
			createXhr = function() {
				return new global.ActiveXObject('Msxml2.XMLHTTP.3.0');
			};
		}
	}
	catch(e) {};
};