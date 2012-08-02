/*global html,isHostMethod */

/*
Description:
Relies on both W3C compliant `e.stopPropagation()` and MS event model `e.cancelBubble`
*/

/*
Degrades:
TBC
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