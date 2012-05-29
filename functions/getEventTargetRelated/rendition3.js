/*global html,isHostMethod*/

/*
Description:
Relies on MS `e.srcElement`, `e.fromElement` and `e.toElement` which works in IE8-
*/

/*
Support:
IE4, NN4
*/

var getEventTargetRelated;

if(html && isHostMethod(html, 'attachEvent')) {
	getEventTargetRelated = function(e) {
		if (e.srcElement == e.fromElement) { return e.toElement; }
		if (e.srcElement == e.toElement) { return e.fromElement; }
		return target;
	};
}