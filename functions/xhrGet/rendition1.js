/*global xhrCreate,bind */

/*
Description:
Relies on `jessie.xhrCreate`
*/

var xhrGet;

// if you can't create one then you certainly can't send one
if(xhrCreate && bind) {
	

	xhrGet = function(xhr, url, options) {
		
		options = options || {};
		options.thisObject = options.thisObject || xhr;
		
		var successFn,
			failFn,
			completeFn;

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
		xhr.onreadystatechange = handleReadyStateChange;
		xhr.send(null);
		return xhr;
	};
}
