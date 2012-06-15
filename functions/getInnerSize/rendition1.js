/*global html */

/*
Description:
Relies on `el.clientWidth/Height`
*/

/*
Degrades:
IE3
*/

var getInnerSize;

if(html && typeof html.clientWidth == 'number') {
	getInnerSize = function(el) {
		return [el.clientHeight, el.clientWidth];
	};
}