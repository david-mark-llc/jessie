/*global */

var getInputValue;

/*
Description:
getInputValue



*/

getInputValue = function(elInput, defaultValue) {
	return elInput[defaultValue ? 'defaultValue' : 'value'];
};