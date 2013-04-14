/* */


var Element = function(node) {	
	if (!(this instanceof Element)) {
		return new Element(node);
	}
	
	if ('string' == typeof node) {
		node = getElement(node);
	}
	
	this.getNode = function() {
		return node;
	};
	
	this.load = function(node) {
		
	};
	
	
	// an array of {eventType:"click",listener:listener,fn:fn} objects
	
	this.listeners = [];
};