/*
Description:
Wide support
*/

var getOptionValue;

if (isHostMethod(html, hasAttribute)) {
    getOptionValue = function(o) {
        return (o.value || (hasAttribute( o, 'value' ) ? o.value : o.text));
    };
}
