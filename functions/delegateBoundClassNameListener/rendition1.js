/*global global,isHostMethod,delegateBoundListener,hasClass,getDescendantsByClassName,isDescendant*/

/*
Description:
Relies on `jessie.delegateBoundListener`, `jessie.hasClass`, `jessie.getDescendantsByClassName` and `jessie.isDescendant`
*/

var delegateBoundClassNameListener;

if(delegateBoundListener && hasClass && getDescendantsByClassName && isDescendant) {
	delegateBoundClassNameListener = function(el, eventType, className, fn, thisObject) {

		var fnDelegate = function(target) {

			// we need to check that the target has the class name
			// if not then we need to see if the target is a child of an element with that class name
			if(hasClass(target, className)) {
				return target;
			}

			var elements = jessie.getDescendantsByClassName(document, className);
			for(var i = 0; i < elements.length; i++) {
				if( isDescendant(elements[i], target) ) {
					return elements[i];
				}
			}
		};

		return delegateBoundListener(el, eventType, fn, fnDelegate, thisObject);
	};
}