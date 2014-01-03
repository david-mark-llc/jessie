/*global createElement,isHostMethod */



var isEventSupported;
var supportedEvents = {};

if (createElement) {
	isEventSupported = function(eventName, el) {
		eventName = 'on' + eventName;
		var eventKey = eventName + (el && el.tagName || '');

		if (typeof supportedEvents[eventKey] == 'undefined') {
			supportedEvents[eventKey] = true;
			el = el || createElement('div');
			if (el && isHostMethod(el, 'setAttribute')) {
				if (typeof el[eventName] == 'undefined') {
					el.setAttribute(eventName, 'window.alert(" ");');
					supportedEvents[eventKey] = isHostMethod(el, eventName);
				}
			}
		}
		return supportedEvents[eventKey];
	};
}