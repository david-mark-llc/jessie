/*global Element,attachListener*/

if(Element && attachListener) {
	Element.prototype.attachListener = function(eventType, fn) {
		var listener = attachListener(this.node, eventType, fn);

		this.listener.push({
			eventType: eventType,
			fn: fn,
			listener: listener
		});

		return this;
	};
}