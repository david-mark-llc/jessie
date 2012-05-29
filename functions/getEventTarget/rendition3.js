/*global html,isHostMethod */

/*
Description:
Relies on MS `e.srcElement`
*/

/*
Support:
IE4, NN4
*/

var getEventTarget;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTarget = function(e) {
		return e.srcElement;
	};
}