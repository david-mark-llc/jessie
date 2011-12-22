//Needs to be forked properly so sparse arrays can be flagged and handled correctly.
//Callback signature of forEachSparse is different also (indexOf for current index?), also might not be in order

var forEach;
var forEachSparse;
if (Array.prototype.forEach){
	forEach = function(elements, callback, thisObject) {
		elements.forEach(callback, thisObject);
	};
} 
else if (Function.prototype.call) {
	forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			callback.call(thisObject || elements, elements[i], i, elements);
		}
    };
	forEachSparse = function(elements, callback, thisObject) {
		for (var property in elements) {
			if (String(property >>> 0) == property && property >>> 0 != 0xffffffff) {
				callback.call(thisObject || elements, elements[property], elements);
			}
		}		
    };
}  
