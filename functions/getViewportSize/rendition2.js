/*global getViewportSize:true,globalDocument,html */
// WIP


// Since document.clientHeight is reliable where (rarely) supported, and since
// browsers that support this property don't return the viewport dimensions from
// document.body.clientHeight or document.documentElement.clientHeight, this
// should be the very first condition:
// Safari 2
if(typeof globalDocument.clientWidth == 'number') {
	getViewportSize = function() {
		return [document.clientWidth, document.clientHeight];
	};
}

// Is document.documentElement.clientHeight reliable?
// It is deemeded unreliable when:
// a) it is 0 or,
// b) it is taller than the viewport
var isDocumentElementUnreliable;

// this means we should use the body.clientHeight/Width
if(html && html.clientHeight === 0) {
	isDocumentElementUnreliable = true;
}
else {
	isDocumentElementUnreliable = (function() {
		// force documentElement to be bigger than viewport
		var result = false;
		// create div
		var div = globalDocument.createElement('div');
		// make it taller than a normal viewport
		div.style.height = "2500px";
		// prepend the big div to the document body
		globalDocument.body.insertBefore(div, globalDocument.body.firstChild);
		// check to see if documentElement.clientHeight is that high
		// (or "almost" that high, to account for documentElement having
		// a border). If it is, then documentElement.clientHeight
		// is unreliable
		result = html.clientHeight > 2400;
		// remove from body
		globalDocument.body.removeChild(div);
		return result;
	})();
}

if(isDocumentElementUnreliable) {
	// Opera less than 9.5 and IE in quirks mode
	getViewportSize = function() {
		return [document.body.clientWidth, document.body.clientHeight];
	};
}
else {
	// modern webkit, firefox, ie
	getViewportSize = function() {
		return [document.documentElement.clientWidth, document.documentElement.clientHeight];
	};
}