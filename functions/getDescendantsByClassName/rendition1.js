/*global globalDocument,isHostMethod,toArray */

/*
Description:
For newer browsers and relies on document.getElementsByClassName
*/

var getDescendantsByClassName;

if(globalDocument && isHostMethod(globalDocument, "getElementsByClassName") && toArray) {
	getDescendantsByClassName = function(el, className) {
		return toArray((el || document).getElementsByClassName(className));
	};
}