/*global cancelDefault:true,isHostMethod,html */

if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}