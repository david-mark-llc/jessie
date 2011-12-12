(function() {
	
	var reFeaturedMethod = new RegExp('^(function|object)$', 'i');

	JESSIE.isHostMethod = function(object, method) {
		var type = typeof object[method];
    	return !!((reFeaturedMethod.test(type) && object[method]) || type == 'unknown');
	};

})();