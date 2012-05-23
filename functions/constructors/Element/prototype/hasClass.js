/*global Element,hasClass*/

if(Element && hasClass) {
	Element.prototype.hasClass = function(className) {
		return hasClass(this.node, className);
	};
}