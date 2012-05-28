/*global Element,detachListener*/

if(Element && detachListener) {

	Element.prototype.getListenerFromCollection = function(eventType, fn) {
		var listenerObj;
		for(var i = 0; i < this.listeners.length; i++) {
			listenerObj = this.listeners[i];
			if(	listenerObj.eventType === eventType && 
				listenerObj.fn === fn) {
				break;
			}
		}
		return listenerObj.listener;
	};

	Element.prototype.removeListenerFromCollection = function(listener) {
		var listenerObj;
		for(var i = 0; i < this.listeners.length; i++) {
			listenerObj = this.listeners[i];
			if(	listenerObj.listener === listener) {
				this.listeners.splice(i, 1);
				break;
			}
		}
	};

	Element.prototype.detachListener = function(eventType, fn) {
		var listenerToDetach = this.getListenerFromCollection(eventType, fn);		
		detachListener(this.node, eventType, listenerToDetach);
		this.removeListenerFromCollection(listenerToDetach);
		return this;
	};
	
}