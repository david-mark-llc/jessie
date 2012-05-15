/*global getElementTagName:true */

var getElementTagName;

getElementTagName = function (el) {
	var tagName = (el.tagName || el.nodeName).toLowerCase();
	return tagName.indexOf('html:') > -1 ? tagName.substring(5) : tagName;
};