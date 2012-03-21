// IE 6 users that have updated their msxml dll files. 

var createXhr;

if(!createXhr && isHostMethod(global, 'ActiveXObject')) {
	try {
		if(new global.ActiveXObject('Msxml2.XMLHTTP.6.0')) {
			createXhr = function() {
				return new global.ActiveXObject('Msxml2.XMLHTTP.6.0');
			};
		}
	}
	catch(e) {};
};