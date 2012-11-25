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

var prependHtml;

if (html && isHostMethod(html, 'insertAdjacentHTML')) {
    prependHtml = function (el, html) {
        el.insertAdjacentHTML('afterBegin', html);
    };
}