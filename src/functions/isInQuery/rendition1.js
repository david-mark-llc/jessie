/*global isNodeInNodeList,query */

/*
Description:
Relies on `jessie.isNodeInNodeList`, `jessie.query`
*/

/*
Author:
Graham Veal
*/

var isInQuery;

if(isNodeInNodeList && query) {
	isInQuery = function(el, selector) {
		
		return isNodeInNodeList( el, query(selector) );
	};
}