var bind;

if(Function.prototype.bind){
	bind = function(fn, context){
		var prependArgs = Array.prototype.slice.call(arguments, 2);				
		return fn.bind(context, prependArgs);
	};
}


