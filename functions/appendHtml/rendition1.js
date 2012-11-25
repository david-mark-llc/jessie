/*global html*/

/*
 Description:
 Relies on `el.insertAdjacentHTML
 */

/*
 Degrades:
 IE4
 */

/*
 Author:
 Ben Chidgey
 */

var appendHtml;

if (html && isHostMethod(html, 'insertAdjacentHTML')) {
	appendHtml = function (el, html) {
		el.insertAdjacentHTML('beforeEnd', html);
	};
}