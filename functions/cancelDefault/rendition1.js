/*global html,isHostMethod */

/*
Description:
Relies on W3C compliant `e.preventDefault()`
*/

/*
Support:
IE8, Opera 7.6
*/

var cancelDefault;

if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}