/*global html,isHostMethod */

/*
Description:
Relies on MS `e.srcElement`
*/

var getEventTarget;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTarget = function(e) {
		return e.srcElement;
	};
}