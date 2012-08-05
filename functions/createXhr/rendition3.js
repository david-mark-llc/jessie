/*global isHostMethod,global */

/*
Description:
Both W3C and MS ActiveXObject implementations providing greatest support
*/

/*
Degrades:
IE4, NN4
*/

var createXhrFunctions = [
		function() {
          return new global.ActiveXObject("Microsoft.XMLHTTP");
        },
        // for fully patched Win2k SP4 and up
        function() {
          return new global.ActiveXObject("Msxml2.XMLHTTP.3.0");
        },
        // IE 6 users that have updated their msxml dll files.
        function() {
          return new global.ActiveXObject("Msxml2.XMLHTTP.6.0");
        }
	],
	i,
	createXhr;

if(isHostMethod(global, "XMLHttpRequest")) {
	try {
		if(new global.XMLHttpRequest()) {
			createXhr = function() {
				return new XMLHttpRequest();
			};
		}
	}
	catch(e) {}
} else if(isHostMethod(global, 'ActiveXObject')) {
	for (i=createXhrFunctions.length; i--; ) {
		try {
			if (createXhrFunctions[i]()) {
				createXhr = createXhrFunctions[i];
			}
		}
		catch (e) {}
	}
}