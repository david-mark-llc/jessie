/*global globalDocument */

/*
 Description:
 Relies on `el.previousElementSibling`
 */

/*
 Degrades:
IE 5.5, IE 6, IE 7, IE8, FF 3.0
 */

/*
 Author:
 Ben Chidgey
 */

var getPreviousElementSibling;

if (globalDocument && !!globalDocument.body.previousElementSibling) {

	getPreviousElementSibling = function (el) {
		return el.previousElementSibling;
	};
}