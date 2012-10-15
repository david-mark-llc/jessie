/*global isHostMethod */

/*
Description:
Basic rendition which relies on valid markup i.e. forms with unique names and ids
*/

/*
See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/fVp-DWAIGnc">Article</a>

That's the most basic rendition: single document and no allowance for
screwy markup like this:

<input name="test">
<input id="test">
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
David Mark
*/

var getElement;

if (isHostMethod(document, 'getElementById')) {
	getElement = function(id) {
		return document.getElementById(id);
	};
}