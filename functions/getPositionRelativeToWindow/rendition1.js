/*global html,isHostMethod */

/*
Description:
Relies on el.getBoundingClientRect and has decent coverage
*/

//https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/cd625a14ce603084?hl=en&noredirect=true

var getPositionRelativeToWindow;

if(html && isHostMethod(html, 'getBoundingClientRect')) {
	getPositionRelativeToWindow = function(el) {
		var rect = el.getBoundingClientRect();
		return [rect.left, rect.top];
	};
}