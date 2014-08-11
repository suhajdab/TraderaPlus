traderaPlus.items = ( function( tp ) {
	var data;
	
	var controller = 'items',
		idAttr = 'data-item-id',
		dropdownSelector = 'a[data-controller="' + controller + '"]',
		blockedClass = 'blockedItem';
	

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
		var id = getItemId( cont );
		
		data.push( id );
		addClass( cont, tp.prefix + blockedClass );
		save();
	}

	function unblock( cont ) {
		var id = getItemId( cont ),
			i = data.indexOf( id );

		if ( i !== -1 ) {
			data.splice( i, 1 );
			save();
			removeClass( cont, tp.prefix + blockedClass );
		}
	}
	
	function getItemId ( el ) {
		return el.getAttribute( idAttr );
	}

	function render() {
		qsa( itemSelector ).forEach( function ( el ) {
			id = getItemId( el );
			if ( id && data.indexOf( name ) !== -1 ) addClass( el, tp.prefix + blockedClass );
		});
	}
	
	function handleDropdownClick() {
		var cont = parentByClass( this, 'item-card' );
		if ( cont.className.match( tp.prefix + blockedClass ) ) unblock( cont );
		else block( cont );
	}
	
	return {
		init: init
	}
})( traderaPlus );