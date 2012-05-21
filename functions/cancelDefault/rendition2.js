/*global isHostMethod,html */

/*
Description:
Relies on MS event model e.returnValue
*/

var cancelDefault;

if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}