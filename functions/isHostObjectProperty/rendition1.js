function isHostObjectProperty(object, property) {
	return !!(typeof(object[property]) == 'object' && object[property]);
};