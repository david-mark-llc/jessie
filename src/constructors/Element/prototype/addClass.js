/*global Element,addClass*/

if(Element && addClass) {
	Element.prototype.addClass = function(className) {
		addClass(this.node, className);
		return this;
	};
}