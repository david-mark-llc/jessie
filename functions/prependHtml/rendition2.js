/*global createElement,setHtml*/

/*
 Description:
 Relies on `el.innerHTML` which degrades in IE3
 and `el.insertBefore`
 and `el.firstChild`
 and `createElement`
 and `setHtml`
 */

/*
 Degrades:
 IE3
 */

/*
 Author:
 Ben Chidgey
 */

var prependHtml;

if (html && isHostObjectProperty(html, 'firstChild') && isHostMethod(html, 'insertBefore') && createElement && setHtml) {
    prependHtml = function (el, html) {
        var fragment = createElement('div'),
            child;

        setHtml(fragment, html);

        while (child = fragment.firstChild) {
            el.insertBefore(child, el.firstChild);
        }
    };
}
