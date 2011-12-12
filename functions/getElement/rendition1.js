(function() {
	
	if (JESSIE.isHostMethod(document, "getElementById")) { 
	  JESSIE.getElement = function(id) { 
	    return document.getElementById(id); 
	  }; 
	} 

})();