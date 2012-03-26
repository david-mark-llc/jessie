var delegateQueryListener;

if(delegateListener && isInQuery) {
	delegateQueryListener = function(el, eventType, selector, fn) {
		
		var fnDelegate = function(target) {
			return isInQuery(target, selector);
		}

		delegateListener(el, eventType, fn, fnDelegate);
	}
}