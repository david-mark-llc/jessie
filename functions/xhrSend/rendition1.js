/*global createXhr */

var xhrSend;

// if you can't create one then you certainly can't send one
if(createXhr) {
	
	/*
	*
	* options.method - defaults to "get"
	* options.timeout - defaults to 30 seconds
	* options.complete
	* options.success
	* options.headers
	* options.data
	* options.fail
	*
	*/
	xhrSend = function(xhr, url, options) {
		options = options || {};
		var key,
			method = options.method || 'get',
			data = options.data || null;
		
		xhr.open(method, url);
		
		var defaultHeaders = {
			//'Accept': 'text/javascript, application/json, text/html, application/xml, text/xml, */*',
			//'Content-Type': 'application/x-www-form-urlencoded'
		};
		
		for(key in defaultHeaders) {
			xhr.setRequestHeader(key, defaultHeaders[key]);
		}
		
		if(options.headers) {
			for(key in options.headers) {
				xhr.setRequestHeader(key, options.headers[key]);
			}
		}

		xhr.onreadystatechange = handleReadyStateChange;
		
		function isSuccessfulResponse(xmlHttp) {
			var success = false;
			var status = xmlHttp.status;
			var between200and300 = (status >= 200 && status < 300);
			var notModified = (status == 304);
			// FIXME(shewitt): why is "status == 00" meant to do?
			if(between200and300 || notModified || status === 0 && xmlHttp.responseText) {
				success = true;
			}
			return success;
		}
		
		function handleReadyStateChange() {
			if(xhr.readyState === 4) {
				if(isSuccessfulResponse(xhr)) {
					if(options.success) {
						options.success(xhr);
					}
				}
				else if(options.fail) {
					options.fail(xhr);
				}
				if(options.complete) {
					options.complete(xhr);
				}
			}
		}

		xhr.send(data);
	};
}
