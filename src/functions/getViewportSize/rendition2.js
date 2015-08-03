/*global global, globalDocument, html*/

/*
Description:
Widest support AFAIK
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
			return [win.innerWidth, win.innerHeight]; // Array
		};
	} else  {

		if (typeof globalDocument.compatMode == 'string') {
			getRoot = function(win /* window */) {
				var doc = win.document,
					html = doc.documentElement,
					compatMode = doc.compatMode;

				return compatMode.toLowerCase().indexOf('css') == -1 ? doc.body : html; // element
			};

		// either get rid of fork or do deferred
		// only for rendition that would work in ie5 and under
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
	}

})();

// if(innerWidth) {

// } else if(compatMode) {
// 	if(document.documentElement.clientWidth) {

// 	}
// }

// innerWidth
// else
// 	document.documentELement.clientWidth

