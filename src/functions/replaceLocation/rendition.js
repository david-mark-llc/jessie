/*
Description:
Wide support
*/

var replaceLocation;

if (isHostObjectProperty(window, 'location') && isHostMethod(window.location, 'replace')) {
    replaceLocation = function(uri) {
        window.location.replace(uri);
    };
}