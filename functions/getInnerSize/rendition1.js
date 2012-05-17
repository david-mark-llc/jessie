/*global html */

var getInnerSize;

if(html && typeof html.clientWidth == 'number') {
	getInnerSize = function(el) {
		return [el.clientHeight, el.clientWidth];
	};
}