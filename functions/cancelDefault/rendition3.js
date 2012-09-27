/*global isHostMethod,html */

/*
Description:
Relies on MS event model `e.returnValue` and on W3C compliant `e.preventDefault()`
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var cancelDefault;
	
if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}