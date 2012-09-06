/*global isHostMethod,html */

/*
Description:
Relies on MS event model `e.returnValue`
*/

/*
Degrades:
IE9, IE10, IE4, IE3, Opera 8+,Chrome, FF, Safari
*/

var cancelDefault;

if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}