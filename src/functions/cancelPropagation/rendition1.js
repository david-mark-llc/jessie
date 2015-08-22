/*global html,isHostMethod */

/*
Description:
Cutting edge (W3 compliant)
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
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