/*global html */

/*
Description:
Relies on `el.clientWidth/Height`
*/

/*
Degrades:
IE3
*/

/*
Author:
David Mark
*/

var getInnerSize;

if(html && typeof html.clientWidth == 'number') {
	getInnerSize = function(el) {
		return [el.clientHeight, el.clientWidth];
	};
}