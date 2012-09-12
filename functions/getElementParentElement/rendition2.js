/*global html, isHostObjectProperty*/

var getElementParentElement;

/*
Description:
Relies on `el.parentElement`
*/

/*
Degrades:
IE3
*/

if(html && isHostObjectProperty(html, 'parentElement')) {
	getElementParentElement = function(el) {
		return el.parentElement;
	};
}