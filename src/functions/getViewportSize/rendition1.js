/*global global */

/*
Description:
Will likely include space occupied by scroll bars. Viewport `meta` tag required. Realises on `window.innerWidth`.
*/

/*
Degrades:
IE8
*/

/*
Author:
David Mark
*/

var getViewportSize;

if (typeof global.innerWidth == 'number') {
	getViewportSize = function(win /* window */) {
		if (!win) {
			win = window;
		}
		return [win.innerWidth, win.innerHeight]; // Array
	};
}