/*global html,isHostMethod */

/*
Description:
Relies on MS `e.srcElement`
*/

/*
Degrades:
IE9+, Chrome, FireFox
*/

var getEventTarget;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTarget = function(e) {
		return e.srcElement;
	};
}