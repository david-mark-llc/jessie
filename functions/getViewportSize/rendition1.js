// WIP
var getRoot,
	getViewportSize;
	
if('string' == typeof globalDocument.compatMode) {
	getRoot = function(win) {
		var doc = win.document,
			html = doc.documentElement,
			compatMode = doc.compatMode;
		
		return (html && compatMode.toLowerCase().indexOf('css') != -1) ? html : doc.body;
	};
}
else {
	getRoot = function(win) {
		var doc = win.document,
			html = doc.documentElement;
		
		return (!html || html.clientWidth === 0) ? doc.body : html;
	};
};

getViewportSize = function(win) {
	if (!win) {
		win = global;
	}
	var root = getRoot(win);
	return [root.clientWidth, root.clientHeight];
};







