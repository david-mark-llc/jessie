/*global xhrCreate */

/*
Description:
Relies on `jessie.xhrCreate`
*/

var xhrGet;

// if you can't create one then you certainly can't send one
if(xhrCreate) {
	

	xhrGet = function(xhr, url, options) {
		
		options = options || {};

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
					if('function' == typeof options.success) {
						options.success(xhr);
					}
				}
				else if('function' == typeof options.fail) {
					options.fail(xhr);
				}
				if('function' == typeof options.complete) {
					options.complete(xhr);
				}
			}
		}
		
		xhr.open('GET', url);
		xhr.onreadystatechange = handleReadyStateChange;
		xhr.send(null);
	};
}
