/*global global, html, globalDocument */

/*
Description:
Widest support
*/

/*
Degrades:
IE5.5
*/

/*
Author:
David Mark
*/

var getViewportScrollPosition;

(function() {

	var getRoot;

	if('number' == typeof window.pageXOffset) {
		/*
		Many "standards-based" browsers feature this non-standard property. No ambiguity about what this window property means
		 */
		getViewportScrollPosition = function(win) {
			if (!win) {
				win = window;
			}
			return [win.pageXOffset, win.pageYOffset];
		};

	} else if(html && 'number' == typeof html.scrollTop) {

		if (typeof globalDocument.compatMode == 'string') {
			getRoot = function(win /* window */) {
				var doc = win.document,
					html = doc.documentElement,
					compatMode = doc.compatMode;

				return compatMode.toLowerCase().indexOf('css') == -1 ? doc.body : html;
			};
		}

		if (getRoot) {
			getViewportScrollPosition = function(win /* window */) {
				if (!win) {
					win = window;
				}
				var root = getRoot(win);
				return [root.scrollLeft, root.scrollTop];
			};
		}
	}
})();