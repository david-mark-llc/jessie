var delegateTagNameListener;

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {
		
		var fnDelegate = function(target) {
			var targetTag
			
			
			return isInQuery(target, selector);
		}

		return delegateListener(el, eventType, fn, fnDelegate);
	}
}