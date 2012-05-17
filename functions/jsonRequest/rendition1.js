/*global ajax,parseJson */

var jsonRequest;

if(ajax && parseJson) {
	jsonRequest = function(url, options) {

		var wrappedSuccess = function(response, xhr) {
			var jsonResponse = parseJson(response);
			options.success(jsonResponse, xhr);
		};

		options.success = wrappedSuccess;

		return ajax(url, options);
		
	};
}