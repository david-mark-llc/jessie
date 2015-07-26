/*
Description:
Wide support
*/

var urlEncode;

// If required language features present...

if (typeof encodeURIComponent != 'undefined' && String.prototype.replace) {

    //

    urlEncode = (function() {

        // Create function to encode string

        var fn = function(s) {
            return encodeURIComponent(s).replace( /%20/g, '+' ).replace( /(.{0,3})(%0A)/g, function(m, a, b) {
                return a + (a == '%0D' ? '' : '%0D') + b;
            }).replace( /(%0D)(.{0,3})/g, function( m, a, b ) {
                return a + (b == '%0A' ? '' : '%0A') + b;
            });
        };

        // If passes initial test...

        if (fn('\n \r') == '%0D%0A+%0D%0A') {

            // Return function reference

            return fn; // Function
        }
    })();
}