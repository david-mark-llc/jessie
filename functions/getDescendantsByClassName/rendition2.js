/*global getDescendantsByTagName,hasClass */

var getDescendantsByClassName;

if(getDescendantsByTagName && hasClass) {
		getDescendantsByClassName = function(el, className) {
			var elements = getDescendantsByTagName(document, '*'),
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