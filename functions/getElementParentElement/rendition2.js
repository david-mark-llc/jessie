/*global html, isHostObjectProperty, getDescendantsByTagName*/

var getElementParentElement;

/*
Description:
Relies on 'el.parentElement'
Relies on 'jessie.getDescendantsByTagName'
*/

if (getDescendantsByTagName && isHostObjectProperty(getDescendantsByTagName('head')[0], 'parentElement')) {
	getElementParentElement = function(el) {
		return el.parentElement;
	};
}