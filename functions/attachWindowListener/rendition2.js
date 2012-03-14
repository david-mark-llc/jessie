// Works in IE8-

var attachWindowListener;

if(global && isHostmethod(global, 'attachEvent')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment -- for debugging only 
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) { 
			throw new Error('Use attachListener with an element.'); 
		} 
		
		global.attachEvent('on'+eventType, fn);
	};
};