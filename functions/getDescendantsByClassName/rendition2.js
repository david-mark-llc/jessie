/*global getDescendantsByTagName,hasClass */

/*
Description:
Relies on `jessie.getDescendantsByTagName` and `jessie.hasClass`
*/

var getDescendantsByClassName;

if(getDescendantsByTagName && hasClass) {
		getDescendantsByClassName = function(el, className) {
			var elements = getDescendantsByTagName(el, '*'),
				element,
				i,
				elementsWithClassName = [];
			for(i = 0; i < elements.length; i++) {
				element = elements[i];
				if(hasClass(element, className)) {
					elementsWithClassName.push(element);
				}
			}
			return elementsWithClassName;
		};
}