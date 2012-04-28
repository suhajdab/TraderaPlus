traderaPlus.items = ( function( tp ) {
	var data;
	
	var controller = 'items',
		linkSelector = '.ObjectHeadline a',
		dropdownSelector = 'a[data-controller="' + controller + '"]',
		blockedClass = 'blockedItem';
	

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
		var a = qs( linkSelector, cont ),
			url = a.getAttribute( 'href' ),
			title = a.innerText;
		
		data[ url ] = title;
		addClass( cont, tp.prefix + blockedClass );
		save();
	}

	function unblock( cont ) {
		var url = getItemUrl( cont );
		delete data[ url ];
		removeClass( cont, tp.prefix + blockedClass );
		save();
	}
	
	function getItemUrl ( el ) {
		var a = qs( linkSelector, el );
		return a ? a.getAttribute( 'href' ) : false;
	}

	function render() {
		qsa( itemSelector ).forEach( function ( el ) {
			url = getItemUrl( el );
			if ( url && data[ url ] ) addClass( el, tp.prefix + blockedClass );
		});
	}
	
	function handleDropdownClick( e ) {
		var cont = parentByClass( this, 'Box-F' );
		if ( cont.className.match( tp.prefix + blockedClass ) ) unblock( cont );
		else block( cont );
	}
	
	return {
		init: init
	}
})( traderaPlus );