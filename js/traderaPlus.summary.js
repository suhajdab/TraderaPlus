traderaPlus.summary = ( function ( tp ) {

    var parentSelector = '.search-result-heading',
		className = tp.prefix + 'summary',
		container;

	function setup () {
		var parent = qs( parentSelector );

		container = document.createElement( 'span' );
		container.className = className;
		container.title = traderaPlusStrings.about;
		parent.appendChild( container );
	}

    function update () {
		tp.observer.pause();

		if ( qs( parentSelector ) ) {
			if ( !qs( '.' + className ) ) setup();

			var blocked = tp.sellers.getBlockedCount() + tp.items.getBlockedCount(),
				str = '';

			str += ( blocked == 1 ) ? traderaPlusStrings.blockedProduct : tmpl( traderaPlusStrings.blockedProducts, { x: blocked } );
			str += ' ' + traderaPlusStrings.blockedByTP;
			container.innerHTML = str;
		}

		tp.observer.resume();
    }

	return {
		update: update
	}

})( traderaPlus );