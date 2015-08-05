/*global html,isHostMethod,canCall*/

/*
Description:
Widest support down to IE5.
*/

/*
Degrades:
IE5, NN4
*/

/*
Author:
David Mark
*/

var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) {
		el.addEventListener(eventType, fn, false);
		return fn;
	};
}
else if(html && isHostMethod(html, 'attachEvent') && canCall) {
	// The "theseObjects" variable must be global
	// or a property of a global object (e.g. a "namespace" object).
	// Stores references to objects used for - this - object in listeners
	jessie.theseObjects = [];

	var theseObjectsIndex = 0;

	attachListener = function(el, eventType, fn) {
		var thisObjectIndex = theseObjectsIndex++;

		// Store reference to object used for - this - in listener
		jessie.theseObjects[thisObjectIndex] = el;

		var listener = function() {
			var e = window.event;
			fn.call(jessie.theseObjects[thisObjectIndex], e);
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
