traderaPlus.sellers = ( function( tp ) {
	var data;
	
	var controller = 'sellers',
		linkSelector = '.seller a',
		dropdownSelector = 'a[data-controller="' + controller + '"]',
		blockedClass = 'blockedSeller';
	

	function init () {
		data = tp.load( controller );
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
		var a = cont.querySelector( linkSelector ),
			url = a.getAttribute( 'href' ),
			title = a.innerText;
		
		data[ url ] = title;
		save();
		render();
	}

	function unblock ( cont ) {
		var url = getItemUrl( cont );
		delete data[ url ];
		save();
		render();
	}
	
	function getItemUrl ( el ) {
		var a = qs( linkSelector, el );
		return a ? a.getAttribute( 'href' ) : false;
	}

	function render () {
		qsa( '.' + tp.prefix + blockedClass ).forEach( function ( el ) {
			removeClass( el, tp.prefix + blockedClass );
		});
		
		qsa( tp.itemSelector ).forEach( function ( el ) {
			url = getItemUrl( el );
			if ( url && data[ url ] ) addClass( el, tp.prefix + blockedClass );
		});
	}
	
	function handleDropdownClick ( e ) {
		var cont = parentByClass( this, 'Box-F' );
		if ( cont.className.match( tp.prefix + blockedClass ) ) unblock( cont );
		else block( cont );
	}
	
	return {
		init: init
	}
})( traderaPlus );