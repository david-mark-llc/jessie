/*global attachWindowListener:true,global,isHostMethod */
// Degrades in IE 8-
// Also degrades in some older browsers that lack this method on
// window objects
// No frames

if(global && isHostMethod(global, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment -- for debugging only
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function(e) {
			fn.call(e, e);
		};

		global.addEventListener(eventType, listener, false);

		return listener;
	};
}