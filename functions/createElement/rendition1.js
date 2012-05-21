/*global globalDocument,isHostMethod*/

/*
Description:
Relies on document.createElement
*/

var createElement;

if(globalDocument && isHostMethod(globalDocument, "createElement")) {
	createElement = function(tagName, doc) {
		return (doc || document).createElement(tagName);
	};
}