/*global parseJson:true,global,isHostMethod */

if(isHostObjectProperty(global, "JSON") && isHostMethod(JSON, "parse")) {
	parseJson = function(str) {
		return JSON.parse(str);
	};
};