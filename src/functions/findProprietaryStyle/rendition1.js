/*global html,isHostObjectProperty */

/*
Description:
Wide support
*/

var findProprietaryStyle;

if(html && isHostObjectProperty(html, "style")){
	findProprietaryStyle = function (style, el) {
		if ('string' != typeof el.style[style]) {
			var prefixes = ['Moz', 'O', 'Khtml', 'Webkit', 'Ms'],
			i = prefixes.length;
			style = style.charAt(0).toUpperCase() + style.substring(1);
			while ( i-- ) {
				if ('undefined' != typeof el.style[prefixes[i] + style]) {
					return prefixes[i] + style;
				}
			}
			return null;
		}
		return style;
	};
}
