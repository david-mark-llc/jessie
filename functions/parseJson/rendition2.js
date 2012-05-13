/*global parseJson:true,global,isHostMethod */

if(!parseJson) {
	parseJson = function(str) {
		return (new Function('return (' + str + ')'))();
	};
};