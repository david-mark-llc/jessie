var forEach, forEachProperty;
var canCall = !!Function.prototype.call;  
if (isOwnProperty && canCall) {
	forEachProperty = function(o, fn, context) {
		var prop;
		context = context || o;
		if (arguments[4]) { 
			for (var i = 0, l = o.length; i < l; i++) {
				fn.call(context, o[i], i, o);
			}
		} 
		else {
			for (prop in o) { if (isOwnProperty(o, prop)) { fn.call(context, o[prop], arguments[3] ? +prop : prop, o); } }
		}
	};
} 
if (Array.prototype.forEach) {
	forEach = function(a, fn, context) { a.forEach(fn, context); };
} 
else if (forEachProperty) {
    forEach = function(a, fn, context) { return forEachProperty(a, fn, context, true, arguments[3]); };
}


  
