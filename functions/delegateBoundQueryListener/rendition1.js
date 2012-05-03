var delegateBoundQueryListener;

if(delegateBoundListener && isInQuery) {
	delegateBoundQueryListener = function(el, eventType, selector, fn, thisObject) {
		
		var fnDelegate = function(target) {
			return isInQuery(target, selector);
		};

		return delegateBoundListener(el, eventType, fn, fnDelegate, thisObject);
	};
};