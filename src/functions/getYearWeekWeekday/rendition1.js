
var getYearWeekWeekday;

/*
Description:
Wide support
*/

getYearWeekWeekday = function(y, m, d) { // ISO 8601 WkNo. m=1..12

    // Based on work by Dr JR Stockton (http://www.merlyn.demon.co.uk/)

    var ms1d = 864e5, ms7d = 7 * ms1d;
    var DC3 = Date.UTC( y, m - 1, d + 3 ) / ms1d;   // an Absolute Day Number
    var DoW = 1 + ( DC3 + 7777777 ) % 7;
    var AWN = Math.floor( DC3 / 7 );                // an Absolute Week Number
    var Wyr = new Date( AWN * ms7d ).getUTCFullYear();

    return [Wyr, AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1, DoW]; // Array
};