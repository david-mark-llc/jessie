/*global isHostMethod,global */

/*
Description:
For legacy eg. IE5
*/

/*
Support:
IE5.x
*/

var createXhr;

if(isHostMethod(global, 'ActiveXObject')) {
	try {
		if(new global.ActiveXObject('Microsoft.XMLHTTP')) {
			createXhr = function() {
				return new global.ActiveXObject('Microsoft.XMLHTTP');
			};
		}
	}
	catch(e) {}
}