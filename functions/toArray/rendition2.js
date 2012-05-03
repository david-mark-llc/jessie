/*global toArray:true,isHostObjectProperty,globalDocument */
var canDoFastArray;
if(isHostObjectProperty(globalDocument, "childNodes")) {
	try {
		Array.prototype.slice.call(globalDocument.childNodes, 0);
		canDoFastArray = true;
	} catch(e) {
		
	}
}

if(canDoFastArray) {
	toArray = function(a) {
		return Array.prototype.slice.call(a, 0);
	};
}