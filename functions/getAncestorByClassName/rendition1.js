var getAncestorByClassName;

if(html && 'string' == typeof html.className && getElementParent && hasClass) {
	getAncestorByClassName = function(el, className) {
		el = getElementParent(el);
		while (el && !hasClass(el, className)) {
			el = getElementParent(el);
		}
		return el;
	};
};