var xhrAbort;

/*
Description:
*/

/*
Degrades:
In browsers without xhr support
*/

xhrAbort = function(xhr) {
	xhr.abort();
};