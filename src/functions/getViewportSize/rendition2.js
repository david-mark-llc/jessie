/*global globalDocument,html */

var getViewportSize;

/*
Description:
Excludes any space occupied by scroll bars.
*/

/*
Degrades:
IE3
*/

/*
Author:
David Mark
*/

(function() {
	var getRoot;

	if (typeof globalDocument.compatMode == 'string') {
		getRoot = function(win /* window */) {
			var doc = win.document,
				html = doc.documentElement,
				compatMode = doc.compatMode;

			return compatMode.toLowerCase().indexOf('css') == -1 ? doc.body : html; // element
		};
	} else if (typeof html.clientWidth == 'number') {
		getRoot = function(win /* window */) {
			var doc = win.document,
				html = doc.documentElement;

			return html.clientWidth === 0 ? doc.body : html; // element
		};
	}

	if (getRoot) {
		getViewportSize = function(win /* window */) {
			if (!win) {
				win = window;
			}
			var root = getRoot(win);
			return [root.clientWidth, root.clientHeight]; // Array
		};
	}
})();