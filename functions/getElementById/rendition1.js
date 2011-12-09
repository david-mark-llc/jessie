(function() {
	
	if (JESSIE.isHostMethod(document, "getElementById")) { 
	  JESSIE.getElementById = function(id) { 
	    return document.getElementById(id); 
	  }; 
	} 

})();