/*global html,isHostMethod */

/*
Description:
Relies on MS event model i.e. e.srcElement
*/

var getEventTarget;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTarget = function(e) {
		return e.srcElement;
	};
}