/*global html,isHostMethod */

/*
Description:
Relies on W3C compliant `e.preventDefault()`
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
*/

var cancelDefault;

if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}