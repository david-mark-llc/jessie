var every;

/*
Description:
Relies on `Array.prototype.every`
*/

if (Array.prototype.every) {
        every = function(arr, iterator, context) {
                return arr.every(iterator, context);
        };
}
