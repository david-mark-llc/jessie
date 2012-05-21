/*global html */

/*
Description:
Relies on el.clientWidth/Height and is well supported
*/

var getInnerSize;

if(html && typeof html.clientWidth == 'number') {
	getInnerSize = function(el) {
		return [el.clientHeight, el.clientWidth];
	};
}