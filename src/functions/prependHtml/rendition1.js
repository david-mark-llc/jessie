/*global html*/

/*
 Description:
 Relies on `el.insertAdjacentHTML
 IE6 `el.insertAdjacentHtml` does not work on table, tbody, thead, tr elements
 */

/*
 Degrades:
 IE3, Firefox 7, Safari 3, Opera 7
 */

/*
 Author:
 Ben Chidgey
 */

var prependHtml;

if (html && isHostMethod(html, 'insertAdjacentHTML')) {
	prependHtml = function (el, html) {
		el.insertAdjacentHTML('afterBegin', html);
	};
}