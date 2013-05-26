/*global global, globalDocument, html*/

/*
Degrades:
IE3
*/

var getViewportSize;

(function() {

	var getRoot;

	if (typeof global.innerWidth == 'number') {
		getViewportSize = function(win /* window */) {
			return [win.innerWidth, win.innerHeight]; // Array
		};
	} else  {

		if (typeof globalDocument.compatMode == 'string') {
			getRoot = function(win /* window */) {
				var doc = globalDocument,
					html = doc.documentElement,
					compatMode = doc.compatMode;

				return compatMode.toLowerCase().indexOf('css') == -1 ? doc.body : html; // element
			};
		} else if (typeof html.clientWidth == 'number') {
			getRoot = function(win /* window */) {
				var doc = globalDocument,
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
	}

})();