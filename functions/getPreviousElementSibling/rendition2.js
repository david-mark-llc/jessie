/*global globalDocument */

/*
Description:
Relies on `el.previousSibling`
*/

/*
 Author:
 Ben Chidgey
 */

var getPreviousElementSibling;

if (globalDocument && !!globalDocument.body.previousSibling) {

	getPreviousElementSibling = function (el) {

		do {
			el = el.previousSibling;
		} while (el && el.nodeType !== 1);

		return el;
	};
}