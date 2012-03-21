var xhrSend;

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
	xhrSend = function(url, options) {
		options = options || {};
		var xmlHttp = createXhr();
		xmlHttp.open(options.method || "get", url);
		
		var defaultHeaders = {
			'Accept': 'text/javascript, application/json, text/html, application/xml, text/xml, */*',
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		
		for(var key in defaultHeaders) {
			xmlHttp.setRequestHeader(key, defaultHeaders[key]);
		}	
		
		if(options.headers) {
			for(var key in options.headers) {
				xmlHttp.setRequestHeader(key, options.headers[key]);
			}				
		}

		xmlHttp.onreadystatechange = handleReadyStateChange;
		
		function isSuccessfulResponse(xmlHttp) {
			var success = false;
			var status = xmlHttp.status;
			var between200and300 = (status >= 200 && status < 300);
			var notModified = (status == 304);
			
			if(between200and300 || notModified || status == 00 && xmlHttp.responseText) {
				success = true;
			}			
			
			return success;
		}
		
		function handleReadyStateChange() {
			if(xmlHttp.readyState === 4) {
				// what constitutes a success
				if(options.success && isSuccessfulResponse(xmlHttp)) {
					options.success(xmlHttp);
				}
				else if(options.fail) {
					options.fail(xmlHttp);
				}
				if(options.complete) {
					options.complete(xmlHttp);
				}
			}
		};

		//if(isHostMethod(xmlHttp, "overrideMimeType")) {
		//	xmlHttp.overrideMimeType(mimetype);
		//}

		//xmlHttp.abort();
		//xmlHttp.getAllResponseHeaders();
		//xmlHttp.getResponseHeader();
		//xmlHttp.init
		//xmlHttp.openRequest
		//xmlHttp.sendAsBinary

		var data = null;
		if(options.method == "post" && options.data) {
			data = options.data;
		}

		xmlHttp.send(data);

	};
};