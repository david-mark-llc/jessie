/*global isHostMethod, isHostObjectProperty */

var getGeoLocation;

/*
 * Description:
 * Context:
 * Relies on 'window.navigator.geolocation.getCurrentPosition'
 * Degrades in IE8
 */

// If required host object and methods are present...

if (isHostObjectProperty(window, 'navigator') && isHostObjectProperty(window.navigator, 'geolocation') && isHostMethod(window.navigator.geolocation, 'getCurrentPosition')) {
	
	// Wall off saved position and callback in module
	
	(function() {
		var savedPosition;

		function doCallback(position, callback, thisObject) {
			callback.call(thisObject || global, {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}, position);
		}

		// Refresh defaults to true, pass false to use cached result (if any)
		
		getGeoLocation = function(callback, thisObject, refresh) {
			
			// If previously cached and requested NOT to refresh...
			
			if (savedPosition && refresh !== false) {
				
				// Call back with cached result
				
				doCallback(savedPosition, callback, thisObject);
			} else {
				
				// Update position (asynchronous operation)
				
				window.navigator.geolocation.getCurrentPosition(function(position) {
					
					// Cache result
					
					savedPosition = position;
					
					// Call back with new position
					
					doCallback(position, callback, thisObject);
				});
			}
		};
	})();
}