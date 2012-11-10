/*global xhrCreate,bind,mixin,isOwnProperty */

/*
Description:
Relies on `jessie.xhrCreate` and 'jessie.mixin'
*/

/*
Author:
Adam Silver
*/

var xhrPost;

// if you can't create one then you certainly can't send one
if(xhrCreate && bind && mixin && isOwnProperty) {
	

	xhrPost = function(xhr, url, options) {
		
		options = options || {};
		options.thisObject = options.thisObject || xhr;

		var data = options.data || null,
			successFn,
			failFn,
			completeFn,
			headers = {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'X-Requested-With' : 'XMLHttpRequest'
			};

		if(options.headers){
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

		for(var key in headers) {
			if(isOwnProperty( headers, key )){
				xhr.setRequestHeader(key, headers[key]);
			}
		}

		xhr.open('POST', url);
		xhr.onreadystatechange = handleReadyStateChange;
		xhr.send(data);

		return xhr;
	};
}
