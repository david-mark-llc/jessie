/*global */

var getInputValue;

/*
Description:
getInputValue



*/

getInputValue = function(elInput, default) {
	return elInput[default ? 'defaultValue' : 'value'];
};