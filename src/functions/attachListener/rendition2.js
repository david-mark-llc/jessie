/*global html,isHostMethod */
/*
Description:
Relies on Microsoft's `el.attachEvent`
*/

/*
Degrades:
IE10, IE9, IE4, IE3, Opera 8+, Chrome, FF, Safari
*/

/*
Author:
David Mark
*/

var attachListener;

if(html && isHostMethod(html, 'attachEvent')) {

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
