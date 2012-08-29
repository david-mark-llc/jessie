/*global ajaxGet,parseJson,bind*/

/*
Description:
Relies on `jessie.ajaxGet` and `jessie.parseJson`
*/

/*
Degrades:
*/

var jsonGet;

if(ajaxGet && parseJson && bind) {
	jsonGet = function(url, options) {
		options = options || {};
		var	wrappedSuccessFn,
			originalFunction = options.success;

		if(originalFunction) {
			wrappedSuccessFn = function(response, xhr) {
				options.thisObject = options.thisObject || xhr;
				originalFunction = bind(originalFunction, options.thisObject);
				var json = parseJson(response);
				originalFunction(json, xhr);
			};
			options.success = wrappedSuccessFn;
		}

		return ajaxGet(url, options);
	};
}