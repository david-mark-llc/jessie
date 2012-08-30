/*global jessieNamespace,html,isHostMethod*/

/*
Description:
Both W3C and MS implementation therefore providing the greatest browser support
*/

/*
Degrades:
IE4, NN4
*/

var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) {

		var listener = function(e) {
			fn.call(el, e);
		};

		el.addEventListener(eventType, listener, false);

		return listener;
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	// The "theseObjects" variable must be global
	// or a property of a global object (e.g. a "namespace" object).
	// Stores references to objects used for - this - object in listeners
	jessieNamespace.theseObjects = [];

	var theseObjectsIndex = 0;

	attachListener = function(el, eventType, fn) {
		var thisObjectIndex = theseObjectsIndex++;

		// Store reference to object used for - this - in listener
		jessieNamespace.theseObjects[thisObjectIndex] = el;

		var listener = function() {
			var e = window.event;
			fn.call(el, e);
		};

		el.attachEvent('on'+eventType, listener);

		// Discard unneeded references
		// Prevents circular references with host objects (e.g. the element)
		// Prevents IE leaks related to such circular references
		// No unload event cleanup required
		el = null;

		return listener;
	};
}