/*global global */

/*
Description:
Cutting edge, will include space occupied by scroll bars. Fine for working out how to center a dialog for example.
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
		return [win.innerWidth, win.innerHeight];
	};
}