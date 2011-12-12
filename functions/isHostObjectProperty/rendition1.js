(function() {
	
	JESSIE.isHostObjectProperty = function(object, property) {
		return !!(typeof(object[property]) == 'object' && object[property]);
	};

})();