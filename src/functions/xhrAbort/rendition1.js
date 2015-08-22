var xhrAbort;

/*
Description:
Todo
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