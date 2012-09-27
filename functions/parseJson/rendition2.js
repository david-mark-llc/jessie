/*global global,isHostMethod */

/*
Description:
For browsers without `window.JSON.parse`
*/

/*
Author:
David Mark
*/

var parseJson;

parseJson = function(str) {
	return (new Function('return (' + str + ')'))();
};