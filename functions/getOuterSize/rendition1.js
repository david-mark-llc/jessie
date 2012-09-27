/*global html */

/*
Description:
Relies on `el.offsetWidth/Height`
*/

/*
Degrades:
IE3
*/

/*
Author:
David Mark
*/

var getOuterSize;

if(html && typeof html.offsetWidth == 'number') {
	getOuterSize = function(el) {
		return [el.offsetHeight, el.offsetWidth];
	};
}