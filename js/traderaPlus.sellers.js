traderaPlus.sellers = ( function( tp ) {
	var data, blockedCount = 0;
	
	var controller = 'sellers',
		elSelector = '.item-card-details-seller',
		dropdownSelector = 'a[data-controller="' + controller + '"]',
		blockedClass = 'blockedSeller';
	

	function init () {
		data = tp.load( controller ) || [];
		render();
		qsa( dropdownSelector ).forEach( attachListener );
	}

	function save () {
		tp.save( controller, data );
	}
	
	function attachListener ( el ) {
		el.addEventListener( 'click', handleDropdownClick, false );
	}
	
	function block ( cont ) {
		var name = getSeller( cont );

		data.push( name );
		save();
		render();
	}

	function unblock ( cont ) {
		var name = getSeller( cont ),
			i = data.indexOf( name );

		if ( i !== -1 ) {
			data.splice( i, 1 );
			save();
			render();
		}
	}
	
	function getSeller ( cont ) {
		var el = qs( elSelector, cont ),
			match = el.innerText.replace(/^\s+|\s+$|\s+(?=\s)/g, "").match(/[^ |]*/);
		return match.length ? match[ 0 ] : false;
	}

	function render () {
        blockedCount = 0;
		qsa( '.' + tp.prefix + blockedClass ).forEach( function ( el ) {
			el.classList.remove( tp.prefix + blockedClass );
		});
		
		qsa( tp.itemSelector ).forEach( function ( el ) {
			var name = getSeller( el );
			if ( name && data.indexOf( name ) !== -1 ) {
				el.classList.add( tp.prefix + blockedClass );
                blockedCount ++;
            }
		});

		tp.summary.update();
		tp.log( 'items blocked by seller: ' + blockedCount );
	}
	
	function handleDropdownClick () {
		var cont = parentByClass( this, 'item-card' );
		if ( cont.className.match( tp.prefix + blockedClass ) ) unblock( cont );
		else block( cont );
	}
	
	return {
		init: init,
		getBlockedCount: function () { return blockedCount; }
	}
})( traderaPlus );