/*global xhrCreate,bind,mixin,isOwnProperty */

/*
Description:
Relies on `jessie.xhrCreate` and 'jessie.mixin'
*/

/*
Author:
Adam Silver
*/

var xhrGet;

// if you can't create one then you certainly can't send one
if(xhrCreate && bind && mixin && isOwnProperty) {

	xhrGet = function( url, options ) {

		var xhr = xhrCreate();

		options = options || {};
		options.thisObject = options.thisObject || xhr;

		var successFn,
			failFn,
			completeFn,
			headers = {
				'X-Requested-With' : 'XMLHttpRequest'
			};

		if(options.headers) {
			mixin(headers, options.headers);
		}

		if(options.success) {
			successFn = bind(options.success, options.thisObject);
		}

		if(options.fail) {
			failFn = bind(options.fail, options.thisObject);
		}

		if(options.complete) {
			completeFn = bind(options.complete, options.thisObject);
		}

		function isSuccessfulResponse(xhr) {
			var success = false,
				status = xhr.status,
				between200and300 = (status >= 200 && status < 300),
				notModified = (status === 304);

			if(between200and300 || notModified || (status === 0 && xhr.responseText)) {
				success = true;
			}
			return success;
		}

		function handleReadyStateChange() {
			if(xhr.readyState === 4) {
				if(isSuccessfulResponse(xhr)) {
					if(successFn) {
						successFn(xhr.responseText, xhr);
					}
				}
				else if(failFn) {
					failFn(xhr);
				}
				if(completeFn) {
					completeFn(xhr);
				}
			}
		}

		xhr.open('GET', url);

		for(var key in headers) {
			if(isOwnProperty( headers, key )){
				xhr.setRequestHeader(key, headers[key]);
			}
		}

		xhr.onreadystatechange = handleReadyStateChange;
		xhr.send(null);

		return xhr;
	};
}
