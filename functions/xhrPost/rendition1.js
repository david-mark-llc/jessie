/*global xhrCreate */

/*
Description:
Relies on `jessie.xhrCreate`
*/

var xhrPost;

// if you can't create one then you certainly can't send one
if(xhrCreate) {
	

	xhrPost = function(xhr, url, options) {
		
		options = options || {};
		var data = options.data || null;

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
				
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = handleReadyStateChange;
		xhr.send(data);
		return xhr;
	};
}
