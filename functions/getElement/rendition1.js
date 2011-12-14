if (isHostMethod(document, "getElementById")) { 
  var getElement = function(id) { 
    return document.getElementById(id); 
  }; 
}