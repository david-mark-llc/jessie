/*global isHostMethod,global,globalDocument */
// Degrades in IE 8-
// No frames or other alternate windows
// Can use following to get IE8- to work when document is parsed.
//		<script type="text/javascript">
//			if ('function' == typeof readyListener) {
//				window.setTimeout(readyListener, 1);
//			}
//		</script>
//	</body>

var attachDocumentReadyListener;

var readyListener,
	readyListenerAttached,
	documentIsReady;

if (isHostMethod(global, "addEventListener") && globalDocument && isHostMethod(globalDocument, "addEventListener")) {
	attachDocumentReadyListener = function(fn) {

		// Remove this "scaffolding" on deployment
		if (readyListenerAttached) {
			throw new Error('One too many ready listeners. Use a queue!');
		}

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