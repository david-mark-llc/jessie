/*global ajaxGet,parseJson,bind*/

/*
Description:
Relies on `jessie.ajaxGet` and `jessie.parseJson`
*/

/*
Degrades:
*/

/*
Author:
Adam Silver, Graham Veal
*/

var jsonGet;

if(ajaxGet && parseJson && bind) {
	jsonGet = function(url, options) {
		options = options || {};
		var	originalFunction = options.success;

		if(originalFunction) {

			options.success = function(response, xhr) {

				var json;

				options.thisObject = options.thisObject || xhr;
				originalFunction = bind(originalFunction, options.thisObject);

				try {

					json = parseJson(response);

				} catch( e ){

					json = null;
				}

				originalFunction(json, xhr);
			};
		}

		return ajaxGet(url, options);
	};
}