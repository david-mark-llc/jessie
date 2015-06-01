/*global globalDocument */

/*
 Description:
 Relies on `el.nextElementSibling`
 */

/*
 Degrades:
IE 5.5, IE 6, IE 7, IE8, FF 3.0
 */

/*
 Author:
 Ben Chidgey
 */

var getNextElementSibling;

if (globalDocument && !!globalDocument.getElementsByTagName('head')[0].nextElementSibling) {

	getNextElementSibling = function (el) {
		return el.nextElementSibling;
	};
}