/*global ajaxGet,parseJson*/

/*
Description:
Relies on `jessie.ajaxGet` and `jessie.parseJson`
*/

/*
Degrades:
*/

var jsonGet;

if(ajaxGet && parseJson) {
	jsonGet = function(url, options) {
		options = options || {};
		var	wrappedSuccessFn,
			originalFunction = options.success;
		if(originalFunction) {
			wrappedSuccessFn = function(response, xhr) {
				var json = parseJson(response);
				originalFunction(json, xhr);
			};
			options.success = wrappedSuccessFn;
		}

		return ajaxGet(url, options);
	};
}