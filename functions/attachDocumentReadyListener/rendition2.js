/*global isHostMethod,global,globalDocument */

/*
Description:
Relies on `window.addEventListener` and `document.addEventListener`

Note: No frames or other alternate windows.

Uses `DOMContentLoaded` as bonus so better for asset-heavy documents

Can use following to get IE8- to work when document is parsed:

		<script type="text/javascript">
			if ('function' == typeof readyListener) {
				window.setTimeout(readyListener, 1);
			}
		</script>
	</body>

*/
/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
*/

var attachDocumentReadyListener;

var readyListener,
	readyListenerAttached,
	documentIsReady;

if (isHostMethod(global, "addEventListener") && globalDocument && isHostMethod(globalDocument, "addEventListener")) {
	attachDocumentReadyListener = function(fn) {

		/*SCAFFOLDING:Start*/
		if (readyListenerAttached) {
			throw new Error('One too many ready listeners. Use a queue!');
		}
		/*SCAFFOLDING:End*/

		readyListenerAttached = true;

		// Production function starts here

		// Run on first fired event
		readyListener = function() {
			if (!documentIsReady) {
				documentIsReady = true;
				fn();
			}
		};

		global.addEventListener('load', readyListener, false);
		globalDocument.addEventListener('DOMContentLoaded', readyListener, false);
	};
}