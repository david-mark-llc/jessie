/*global createXhr */

/*
Description:
Relies on `jessie.createXhr`
*/

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
			headers = options.headers || {},
			data = options.data || null;
			
		function isSuccessfulResponse(xmlHttp) {
			var success = false,
				status = xmlHttp.status,
				between200and300 = (status >= 200 && status < 300),
				notModified = (status === 304);
			
			if(between200and300 || notModified || (status === 0 && xmlHttp.responseText)) {
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
		
		if( method === 'post' && typeof headers['Content-Type'] === 'undefined' ){
			headers[ 'Content-Type' ] = 'application/x-www-form-urlencoded';
		}
		
		xhr.open(method, url);
		
		for(key in headers) {
			xhr.setRequestHeader(key, headers[key]);
		}

		xhr.onreadystatechange = handleReadyStateChange;

		xhr.send(data);
	};
}
