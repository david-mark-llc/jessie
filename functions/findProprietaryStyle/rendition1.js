/*global findProprietaryStyle:true,html */

var findProprietaryStyle;

if(html){
	findProprietaryStyle = function (style) {
		if ('string' != typeof html.style[style]) {
			style = style.charAt(0).toUpperCase() + style.substring(1);
			var prefixes = ['Moz', 'O', 'Khtml', 'Webkit', 'ms'];
			for (var i = prefixes.length; i--; ) {
				if ('undefined' != typeof html.style[prefixes[i] + style]) {
					return prefixes[i] + style;
				}
			}
			return null;
		}
		return style;
	};
}
