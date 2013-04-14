/*global Element,addClass*/

if (Elements && Elements.prototype.forEach && addClass) {
	Elements.prototype.addClass = function(className) {
		this.forEach(function(el) {
			addClass(el, className);
		});		
		return this;
	};
}