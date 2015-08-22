/*global html,isHostMethod */

/*
Description:
Cutting edge (W3 compliant) and Microsoft event model providing the widest support.
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var cancelPropagation;

if(html && isHostMethod(html, 'addEventListener')) {
	cancelPropagation = function(e) {
		e.stopPropagation();
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	cancelPropagation = function(e) {
		e.cancelBubble = true;
	};
}