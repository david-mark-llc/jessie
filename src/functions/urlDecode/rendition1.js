/*
Description:
Wide support
*/

var urlDecode;

if (typeof decodeURIComponent != 'undefined' && String.prototype.replace) {

    //

    urlDecode = (function() {

        // Create function to encode string

        var fn = function(s) {
            // TODO: Handle CR/LF issues (see urlEncode)

            return decodeURIComponent(s.replace(/\+/g, '%20'));
        };

        // If passes initial test...

        if (fn('%0D%0A+%0D%0A') == '\n \r') {

            // Return function reference

            return fn; // Function
        }
    })();
}