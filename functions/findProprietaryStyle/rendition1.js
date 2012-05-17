/*global findProprietaryStyle:true,html */

var findProprietaryStyle;
	
findProprietaryStyle = function (style, el) {
	if ('string' != typeof el.style[style]) {
		style = style.charAt(0).toUpperCase() + style.substring(1);
		var prefixes = ['Moz', 'O', 'Khtml', 'Webkit', 'ms'];
		for (var i = prefixes.length; i--; ) {
			if ('undefined' != typeof el.style[prefixes[i] + style]) {
				return prefixes[i] + style;
			}
		}
		return null;
	}
	return style;
};

