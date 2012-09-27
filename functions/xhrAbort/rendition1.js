var xhrAbort;

/*
Description:
*/

/*
Degrades:
In browsers without xhr support
*/

/*
Author:
Adam Silver
*/

xhrAbort = function(xhr) {
	xhr.abort();
	return xhr;
};