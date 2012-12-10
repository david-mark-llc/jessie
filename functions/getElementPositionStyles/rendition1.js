/*global html,getElement,isHostObjectProperty */

/*
Description:
Relies on `jessie.getElement`, `el.style` and `el.offsetLeft`
*/

// Taken from primer

var getElementPositionStyles;

if(html && getElement && isHostObjectProperty(html, 'style') &&
	'number' == typeof html.offsetLeft && 'string' == typeof html.style.left ) {
	
	getElementPositionStyles = (function() {
		var result,
			sides = ['left', 'top', 'right', 'bottom'],
			inlineStyles = {},
			findPosition;
			
		findPosition = function(el, sides) {
			var i,
				offsetLeft,
				offsetTop;
				
			offsetLeft = el.offsetLeft;
			offsetTop = el.offsetTop;
			el.style[sides[2]] = 'auto';
			el.style[sides[3]] = 'auto';
			
			if (offsetLeft != el.offsetLeft) {
				result[sides[0]] = null;
			}

			if (offsetTop != el.offsetTop) {
				result[sides[1]] = null;
			}

			offsetLeft = el.offsetLeft;
			offsetTop = el.offsetTop;

			el.style[sides[0]] = offsetLeft + 'px';
			el.style[sides[1]] = offsetTop + 'px';

			if (result[sides[0]] !== null && el.offsetLeft != offsetLeft) {
				if (sides[0] == 'left') {
					result[sides[0]] = offsetLeft - el.offsetLeft + offsetLeft;
				}
				else {
					result[sides[0]] = el.offsetLeft;
				}
			}

			if (result[sides[1]] !== null && el.offsetTop != offsetTop) {
				if (sides[1] == 'top') {
					result[sides[1]] = offsetTop - el.offsetTop + offsetTop;
				}
				else {
					result[sides[1]] = el.offsetTop;
				}
			}
			
			for (i = 4; i--;) {
				el.style[sides[i]] = inlineStyles[sides[i]];
			}
		};

		return function(el) {
			var i,
				side,
				otherSide;

			result = {};

			for (i = 2; i--;) {
				side = sides[i];
				otherSide = sides[i + 2];
				result[side] = result[otherSide] = el['offset' + side.charAt(0).toUpperCase() + side.substring(1)];
			}

			for (i = 4; i--;) {
				side = sides[i];
				inlineStyles[side] = el.style[side];
			}

			findPosition(el, sides);
			findPosition(el, sides.slice(2).concat(sides.slice(0, 2)));

			return result;
		};
		
	}());
}