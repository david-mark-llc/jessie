/*global cancelDefault:true,html,isHostMethod */

if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}