/*global cancelDefault:true,isHostMethod,html */

var cancelDefault;

if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}