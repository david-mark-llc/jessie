/*global globalDocument,isHostMethod*/

var createElement;

if(globalDocument && isHostMethod(globalDocument, "createElement")) {
	createElement = function(tagName, doc) {
		return (doc || document).createElement(tagName);
	};
}