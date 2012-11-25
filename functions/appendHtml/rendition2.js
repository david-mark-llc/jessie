/*global html,createElement,setHtml*/

/*
 Description:
 Relies on `el.innerHTML` which degrades in IE3
 and `el.appendChild`
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

var appendHtml;

if (html && isHostObjectProperty(html, 'firstChild') && isHostMethod(html, 'appendChild') && createElement && setHtml) {
	appendHtml = function (el, html) {
		var fragment = createElement('div'),
			child;

		setHtml(fragment, html);

		while (child = fragment.firstChild) {
			el.appendChild(child);
		}
	};
}
