/*global html, isHostObjectProperty, getDescendantsByTagName*/

var getElementParentElement;

/*
Description:
Relies on 'el.parentElement' and 'jessie.getDescendantsByTagName'
*/

/*
Degrades:
IE3
*/

if (getDescendantsByTagName && isHostObjectProperty(getDescendantsByTagName('head')[0], 'parentElement')) {
	getElementParentElement = function(el) {
		return el.parentElement;
	};
}