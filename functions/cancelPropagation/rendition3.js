/*global html,isHostMethod */

/*
Description:
Relies on both W3C compliant `e.stopPropagation()` and MS event model `e.cancelBubble`
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