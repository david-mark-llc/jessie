/*global Element,hasClass*/

if(Elements && Elements.prototype.every && hasClass) {
	Element.prototype.haveClass = function(className) {
		return this.every(function(el) {
			return hasClass(el, className);
		});
	};
}