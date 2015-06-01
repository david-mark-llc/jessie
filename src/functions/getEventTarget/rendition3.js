/*global html,isHostMethod */

/*
Description:
Relies on MS `e.srcElement`
*/

/*
Degrades:
IE10, IE9, IE4, IE3, Chrome, FireFox
*/

var getEventTarget;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTarget = function(e) {
		return e.srcElement;
	};
}