/*global getDescendantsByClassName:true,globalDocument,isHostMethod,toArray */

if(globalDocument && isHostMethod(globalDocument, "getElementsByClassName") && toArray) {
	getDescendantsByClassName = function(el, className) {
		return toArray((el || document).getElementsByClassName(className));
	};
}