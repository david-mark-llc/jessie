/*global Element,removeClass*/

if(Element && removeClass) {
	Element.prototype.removeClass = function(className) {
		removeClass(this.node, className);
		return this;
	};
}