/*global globalDocument */

/*
 Description:
 Relies on `el.nextSibling`
 */

/*
 Author:
 Ben Chidgey
 */

var getNextElementSibling;

if (globalDocument && !!globalDocument.getElementsByTagName('head')[0].nextSibling) {

	getNextElementSibling = function (el) {

		do {
			el = el.nextSibling;
		} while (el && el.nodeType !== 1);

		return el;
	};
}