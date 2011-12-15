if(html && isHostMethod(html, 'attachEvent')) {
	var cancelDefault = function(e) { 
	  e.returnValue = false; 
	} 
}