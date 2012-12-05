/*global */

/*
Description:
Iterates a node list to see if any of the nodes match the passed in node.
*/

/*
Author:
Graham Veal
*/

var isNodeInNodeList;

isNodeInNodeList = function( node, nodeList ){

	var isInNodeList = false,
		i = 0,
		l = nodeList.length;

	// could use Array.prototype.indexOf in another rendition
	for( ; i < l; i++ ) {
		if(nodeList[i] === node) {
			isInNodeList = true;
			break;
		}
	}

	return isInNodeList;
};