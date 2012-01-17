var findProprietaryStyle;
if(html){
	findProprietaryStyle = function (style) {		
		if (typeof html.style[style] != 'string') {
			style = style.charAt(0).toUpperCase() + style.substring(1);
			var prefixes = ['Moz', 'O', 'Khtml', 'Webkit', 'ms'];
			for (var i = prefixes.length; i--; ) {
				if (typeof html.style[prefixes[i] + style] != 'undefined') {
					return prefixes[i] + style;
				}
			}
			return null;
		}
		return style;
	};
}
