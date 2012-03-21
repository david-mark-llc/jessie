// for legacy eg. IE 5 

var createXhr;

if(isHostMethod(global, 'ActiveXObject')) {
	try {
		if(new global.ActiveXObject('Microsoft.XMLHTTP')) {
			createXhr = function() {
				return new global.ActiveXObject('Microsoft.XMLHTTP');
			};
		}
	}
	catch(e) {};
};