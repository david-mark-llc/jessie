/*global html,isHostMethod*/

/*
Description:
Relies on MS event model which works in IE8-
*/

var getEventTargetRelated;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTargetRelated = function(e) {
		if (e.srcElement == e.fromElement) { return e.toElement; }
		if (e.srcElement == e.toElement) { return e.fromElement; }
		return target;
	};
}