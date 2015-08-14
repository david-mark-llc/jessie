/*
Description:
Cutting edge only, this function is because native versions are inconsistent
*/

/*
Author:
David Mark
*/

var emptyNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};