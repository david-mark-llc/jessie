/*global html,isHostMethod */


var isDescendant;

if(isHostMethod(html, 'contains')) {
	isDescendant = function(el, elDescendant) {
		return el.contains(elDescendant);
	};
}