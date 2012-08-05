/*global isHostMethod */

/*
Description:
Basic rendition which relies on valid markup i.e. forms with unique names and ids
*/

/*
See: https://groups.google.com/forum/#!starred/comp.lang.javascript/fVp-DWAIGnc

That's the most basic rendition: single document and no allowance for
screwy markup like this:

<input name="test">
<input id="test">
*/

/*
Degrades:
IE4, NN4
*/

var getElement;

if (isHostMethod(document, 'getElementById')) {
	getElement = function(id) {
		return document.getElementById(id);
	};
}