/*
Description:
Cutting edge only, this function is because native versions are inconsistent
*/

/*
Author:
David Mark
*/

var pop = function(a) {
    var v, len = a.length >>> 0;
    if (len) {
      v = a[--len];
      delete a[len];
    }
    a.length = len;
    return v;
  };