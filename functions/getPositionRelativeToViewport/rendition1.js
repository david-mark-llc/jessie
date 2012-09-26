/*global html,isHostMethod */

/*
Description:
Relies on `el.getBoundingClientRect`
*/

//https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/cd625a14ce603084?hl=en&noredirect=true

var getPositionRelativeToViewport;

if(html && isHostMethod(html, 'getBoundingClientRect')) {
	getPositionRelativeToViewport = function(el) {
		var rect = el.getBoundingClientRect();
		return [rect.left, rect.top];
	};
}