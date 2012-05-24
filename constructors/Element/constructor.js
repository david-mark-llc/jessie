
var Element = function(node) {
	this.node = node;
	// an array of {eventType:"click",listener:listener,fn:fn} objects
	this.listeners = [];
};