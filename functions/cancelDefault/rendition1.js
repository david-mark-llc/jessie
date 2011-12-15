if(html && isHostMethod(html, 'addEventListener')) {
	var cancelDefault = function(e) { 
		e.preventDefault();
	};
}