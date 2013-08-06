/*global globalDocument */

/*
Description:
Relies on `el.previousSibling`
*/

/*
 Degrades:
 IE11-, FF5-, Chrome 6-, Safari 5.0-, Opera 11.0-, iOS 4.3-, Android 2.3-
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