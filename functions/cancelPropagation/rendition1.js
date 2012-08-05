/*global html,isHostMethod */

/*
Description:
Relies on W3C compliant `e.stopPropagation()`
*/

/*
Degrades:
IE8, Opera 7.6
*/

var cancelPropagation;

if(html && isHostMethod(html, 'addEventListener')) {
	cancelPropagation = function(e) {
		e.stopPropagation();
	};
}