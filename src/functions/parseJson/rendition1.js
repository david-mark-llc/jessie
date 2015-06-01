/*global global,isHostMethod,isHostObjectProperty */

/*
Description:
Relies on `window.JSON.parse`.

Note: could also use JSON2 lib to 'polyfill'
*/

/*
Author:
Adam Silver
*/

var parseJson;

if(isHostObjectProperty(global, "JSON") && isHostMethod(JSON, "parse")) {
	parseJson = function(str) {
		return JSON.parse(str);
	};
}