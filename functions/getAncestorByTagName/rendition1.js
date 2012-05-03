var getAncestorByTagName;

if(getElementParent && getElementTagName){
	getAncestorByTagName = function(el, tagName) {
		el = getElementParent(el);
		while (el && tagName && getElementTagName(el) != tagName) {
			el = getElementParent(el);
		}
		return el;
	};
}