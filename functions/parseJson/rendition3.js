/*global global,isHostMethod */

/*
Description:
Relies on `window.JSON.parse` or the `Function` constructor providing greatest 
browser support
*/

var parseJson;

if(isHostObjectProperty(global, "JSON") && isHostMethod(JSON, "parse")) {
	parseJson = function(str) {
		return JSON.parse(str);
	};
} else {
	parseJson = function(str) {
		return (new Function('return (' + str + ')'))();
	};
}