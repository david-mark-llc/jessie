/*global getViewportScrollPosition:true,globalDocument */
// need to use this with rendition2.js
var getViewportScrollPosition;

if(globalDocument &&
	globalDocument.body &&
	'number' == typeof globalDocument.body.scrollLeft &&
	'number' == typeof globalDocument.body.scrollTop) {
	
	getViewportScrollPosition = function() {
		return [document.body.scrollLeft, document.body.scrollTop];
	};
}