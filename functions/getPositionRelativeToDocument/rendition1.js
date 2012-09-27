/*global getPositionRelativeToViewport,getViewportScrollPosition*/

/*
Description:

Note: no borders on the HTML element as that can add cross-browser complications (part of the chrome in IE and other MSHTML-based browsers, not so in others) and no quirks mode (as the BODY then becomes outermost element in the layout in IE and the BODY should be allowed to have borders).
*/

/*
Degrades:
*/

/*
Author:
Adam Silver
*/

var getPositionRelativeToDocument;

if(getPositionRelativeToViewport && getViewportScrollPosition) {
	getPositionRelativeToDocument = function(el) {
		var position = getPositionRelativeToViewport(el),
			scrollPosition = getViewportScrollPosition(),
			x = position[0]+scrollPosition[0],
			y = position[1]+scrollPosition[1];

		return [x, y];
	};
}