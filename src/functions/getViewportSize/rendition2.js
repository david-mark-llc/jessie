/*global global, globalDocument, html*/

/*
Description:
Widest support. May include space occupid by scrol bar. So don't use to attempt to cover the viewport, which is ill-advised.
*/

/*
Degrades:
IE5.5
*/

var getViewportSize;

(function() {

	var getRoot;

	if (typeof global.innerWidth == 'number') {
		getViewportSize = function(win /* window */) {
			if (!win) {
				win = window;
			}
			return [win.innerWidth, win.innerHeight];
		};
	} else  {
		if (typeof globalDocument.compatMode == 'string') {
			getRoot = function(win /* window */) {
				var doc = win.document,
					html = doc.documentElement,
					compatMode = doc.compatMode;

				return compatMode.toLowerCase().indexOf('css') == -1 ? doc.body : html;
			};

		// The following fork must be deferred which is not yet implemented in jessie. This fork is for a rendition that works in ie5 and under so isn't particularly necessary anyway
		} else if (typeof html.clientWidth == 'number') {
			getRoot = function(win /* window */) {
				var doc = win.document,
					html = doc.documentElement;

				return html.clientWidth === 0 ? doc.body : html;
			};
		}

		if (getRoot) {
			getViewportSize = function(win /* window */) {
				if (!win) {
					win = window;
				}
				var root = getRoot(win);
				return [root.clientWidth, root.clientHeight];
			};
		}
	}

})();