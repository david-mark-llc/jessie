/*global delegateTagNameListener:true,delegateListener,getElementTagName,isInQuery */

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {
		
		var fnDelegate = function(target) {
			//FIXME(shewitt): selector not defined here!
			return isInQuery(target, selector);
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}