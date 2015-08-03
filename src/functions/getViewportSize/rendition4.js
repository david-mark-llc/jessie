/*global createElement,globalDocument*/

var getViewportSize;

(function() {
	var getViewportDimensions;
	var getRoot;
	var scrollbarHeight;
	var scrollChecks;
	var doc = globalDocument;

	// NOTE: Assumes height of horizontal scroll bar is equal to the width of the vertical

	if (createElement) {
		scrollbarHeight = (function() {
			var height = 0, elDivOuter = createElement('div');
			elDivOuter.style.width = '5px';
			elDivOuter.style.overflow = 'auto';
			elDivOuter.style.visibility = 'hidden';
			elDivOuter.style.position = 'absolute';
			elDivOuter.style.top = '0';
			var elDivInner = createElement('div');
			elDivInner.style.width = '200px';
			elDivInner.style.height = elDivOuter.style.height = '100px';
			elDivOuter.appendChild(elDivInner);
			elDivOuter.style.overflowX = 'auto';
			doc.body.appendChild(elDivOuter);
			if (typeof elDivOuter.offsetHeight == 'number' && typeof elDivOuter.clientHeight == 'number' && elDivOuter.offsetHeight > elDivOuter.clientHeight) {
				height = elDivOuter.offsetHeight - elDivOuter.clientHeight;
			}
			doc.body.removeChild(elDivOuter);
			return height;
		})();

		// Test to find which element contains the changing clientWidth/Height properties

		// REMOVED CHECK FOR createElement as above
		if (html) {

			// Possible ambiguity between HTML and body
			scrollChecks = (function() {
				var oldBorder;
				var body = doc.body;
				var result = {
					compatMode: doc.compatMode
				};
				var clientHeight = html.clientHeight;
				var bodyClientHeight = body.clientHeight;
				var elDiv = createElement('div');

				elDiv.style.height = '100px';
				body.appendChild(elDiv);
				result.body = !clientHeight || clientHeight != html.clientHeight;

				result.html = bodyClientHeight != body.clientHeight;

				body.removeChild(elDiv);

				if (result.body || result.html && (result.body != result.html)) {

					// found single scroller--check if borders should be included
					// skipped if body is the real root (as opposed to just reporting the HTML element's client dimensions)

					if (typeof body.clientTop == 'number' && body.clientTop && html.clientWidth) {
						oldBorder = body.style.borderTopWidth;
						body.style.borderTopWidth = '0px';
						result.includeBordersInBody = body.clientHeight != bodyClientHeight;
						body.style.borderTopWidth = oldBorder;
					}
					return result;
				}
			})();
		}
	}

	// Try to figure the outer-most rendered element.
	// NOTE: This element may not hold the proper clientWidth/Height properties

	if (typeof doc.compatMode == 'string') {
		getRoot = function(win) {
			var doc = win.document, html = doc.documentElement, compatMode = doc.compatMode;

			return (html && compatMode.toLowerCase().indexOf('css') != -1 && html.clientWidth) ? html : doc.body;
		};
	} else {
		getRoot = function(win) {
			var doc = win.document, html = doc.documentElement;

			return (!html || html.clientWidth === 0) ? doc.body : html;
		};
	}

	// NOTE: Do not pass bogus window objects to these functions

	if (typeof doc.clientWidth == 'number') {

		// If the document itself implements clientWidth/Height (e.g. Safari 2)
		// This one is a rarity.  Coincidentally KHTML-based browsers reported to implement
		// these properties have trouble with clientHeight/Width as well as innerHeight/Width.

		getViewportDimensions = function(win) {
			if (!win) {
				win = window;
			}
			var doc = win.document;
			return [doc.clientWidth, doc.clientHeight];
		};
	} else if (html && typeof html.clientWidth == 'number') {

		// If the document element implements clientWidth/Height

		getViewportDimensions = function(win) {
			if (!win) {
				win = window;
			}

			var root = getRoot(win), doc = win.document;
			var clientHeight = root.clientHeight, clientWidth = root.clientWidth;

			// Replace previous guess at root container

			if (scrollChecks) {
				root = scrollChecks.body ? doc.body : doc.documentElement;
			}

			clientHeight = root.clientHeight;
			clientWidth = root.clientWidth;

			if (scrollChecks && scrollChecks.body && scrollChecks.includeBordersInBody) {

				// Add body borders

				clientHeight += doc.body.clientTop * 2;
				clientWidth += doc.body.clientLeft * 2;
			}

			return [clientWidth, clientHeight];
		};
	} else if (typeof window.innerWidth == 'number') {

		// If the window implements innerWidth/Height

		if (html && typeof html.scrollWidth == 'number' && typeof html.clientWidth == 'number' && scrollbarHeight) {

			// Adjusted for scroll bars

			// *** NOTE: branch orphaned now (remove as not needed)

			getViewportDimensions = function(win) {
				if (!win) {
					win = window;
				}
				var root = getRoot(win);
				return [win.innerWidth - ((root.scrollHeight > root.clientHeight && win.innerWidth > scrollbarHeight) ? scrollbarHeight : 0), win.innerHeight - ((root.scrollWidth > root.clientWidth  && win.innerHeight > scrollbarHeight) ? scrollbarHeight : 0)];
			};
		} else {

			// Last resort, return innerWidth/Height
			// NOTE: May include space occupied by scroll bars

			getViewportDimensions = function(win) {
				if (!win) {
					win = window;
				}

				return [win.innerWidth, win.innerHeight];
			};
		}
	}
})();