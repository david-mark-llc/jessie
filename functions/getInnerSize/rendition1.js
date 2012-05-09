/*global getInnerSize:true,html */

if(html && typeof html.clientWidth == 'number') {
	getInnerSize = function(el) {
		return [el.clientHeight, el.clientWidth];
	};
}