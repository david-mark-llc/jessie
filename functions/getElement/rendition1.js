/*
See: https://groups.google.com/forum/#!starred/comp.lang.javascript/fVp-DWAIGnc

That's the most basic rendition: single document and no allowance for 
crewy markup like this:- 

<input name="test"> 
<input id="test"> 
*/

var getElement;

if (isHostMethod(document, 'getElementById')) { 
  getElement = function(id) { 
    return document.getElementById(id); 
  }; 
}