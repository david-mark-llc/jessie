/*global Element,removeClass*/

if (Elements && Elements.prototype.forEach && removeClass) {
	Elements.prototype.addClass = function(className) {
		this.forEach(function(el) {
			removeClass(el, className);
		});		
		return this;
	};
}