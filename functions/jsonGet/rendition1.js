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
		var	wrappedSuccessFn;
		if('function' == typeof options.success) {
			wrappedSuccessFn = function(response, xhr) {
				var json = parseJson(response);
				options.success(json, xhr);
			};
			options.success = wrappedSuccessFn;
		}

		return ajaxGet(url, options);
	};
}