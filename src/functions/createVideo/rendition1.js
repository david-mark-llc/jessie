// At very least, need this host method...

/*
Description:
Browsers taht support HTML5 video
*/

if ( 'undefined' != typeof document.createElement ) {

	var video_errored, enhanceVideo = function( elContainer, options ) {

		// Test MIME type (plus optional Codecs)

    	function testType( el, mimeType ) {

    		// Test the MIME type + codec(s)

      		var result = el.canPlayType( mimeType );

      		// If only MIME type specified...

      		if ( -1 == mimeType.indexOf( ';' ) ) {

          		// Empty string or "no" indicates failure

          		return result && result != 'no';
      		}

      		// Codec(s) specified, so require a "probably" to proceed ("maybe" not good enough)

  			return result == 'probably';
    	}


    	// Reduce original VIDEO structure to fallback content

    	function degradeVideo( el ) {

    		// Create array of child nodes

    		var elChildNodes = Array.prototype.slice.call( el.childNodes, 0 );

    		// Loop through child nodes

    		for ( var i = elChildNodes.length; i--; ) {

    			// If a SOURCE element...

    			if ( elChildNodes.tagName.toLowerCase() == 'SOURCE' ) {

    				// Remove it

    				el.removeChild( elChildNodes[i] );

    			} else {

    				// Put it in the container, above the VIDEO element

    				el.parentNode.insertBefore( elChildNodes[i], el )
    			}
    		}

    		// Finally, remove the VIDEO element

    		el.parentNode.removeChild( el );
    	}

    	// Convert plain text to HTML

    	function text2html( text )
    	{
    		return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;');
    	}

    	// Try to create video element

    	var	el = document.createElement( 'video' );

    	// If created and container features "innerHTML" string property and original structure likely not to work
    	// Or if original structure definitely errored (per the "video_errored" flag)

    	if ( video_errored || ( 'string' == typeof elContainer.innerHTML && ( !el || 'undefined' == typeof el.canPlayType || ( !testType( el, 'video/mp4' ) && !testType( el, 'video/ogg; codecs="theora, vorbis"' ) ) ) ) ) {

    		// Replace the original structure with a Flash object, wrapping a lesser VIDEO element, wrapping an image linked to the MP4 format
			// TODO: Get rid of that OBJECT ID (not used by anything)

    		var html = '<object id="testplayer_api" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + options.width + '" height="' + options.height + '" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" title="' + text2html( options.text ) + '"><param name="movie" value="/video/flowplayer-3.2.7.swf"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="quality" value="high"><param name="cachebusting" value="false"><param name="bgcolor" value="#000000"><param name="flashvars" value="config={&quot;playerId&quot;:&quot;player&quot;,&quot;clip&quot;:{&quot;url&quot;:&quot;/video/' + encodeURIComponent( options.name ) + '.flv&quot;, &quot;autoPlay&quot;: false },&quot;playlist&quot;:[{&quot;url&quot;:&quot;/video/test.flv&quot; }]}"><!--[if !IE]>--><object type="application/x-shockwave-flash" data="/video/flowplayer-3.2.7.swf" width="' + options.width + '" height="' + options.height + '" title="' + text2html( options.text ) + '"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="quality" value="high"><param name="cachebusting" value="false"><param name="bgcolor" value="#000000"><param name="flashvars" value="config={&quot;playerId&quot;:&quot;player&quot;,&quot;clip&quot;:{&quot;url&quot;:&quot;/video/test.flv&quot;, &quot;autoPlay&quot;: false },&quot;playlist&quot;:[{&quot;url&quot;:&quot;/video/test.flv&quot; }]}"><!--<![endif]-->';

    		// Won't hurt to try again with simplified VIDEO (MP4 only)
    		// NOTE: Probably don't want to bother if either video_errored is set or createElement failed to create a usable VIDEO element

    		html += '<video src="/video/' + text2html( options.name ) + '.m4v" height="' + options.height + '" width="' + options.width + '" poster="/images/' + encodeURIComponent( options.name ) + '.png" onclick="if (\'undefined\' != this.play) { this.play(); }" onerror="degradeVideo( this );"><a href="/video/' + encodeURIComponent( options.name ) + '.m4v"><img src="/images/' + encodeURIComponent( options.poster_overlaid ) + '.png" alt="' + text2html( options.text ) + '" width="' + options.width + '" height="' + options.height + '"></a></video>';

    		html += '<!--[if !IE]>--></object><!--<![endif]--></object>';

    		elContainer.innerHTML = html;
   		}

    	// Discard unneeded host object references

    	el = elContainer = null;
	};
}