traderaPlus.items = ( function() {
	var data, prefix;
	
	var linkSelector = '.ObjectHeadline a',
		dropdownSelector = 'a[data-controller="items"]',
		blockedClass = 'blockedItem';
	

	function init () {
		prefix = traderaPlus.prefix;
		load();
		render();
		attachListeners();
	}

	function load () {
		data = JSON.parse( localStorage.getItem( prefix + 'items' ) ) || {};
	}

	function save () {
		localStorage.setItem( prefix + 'items', JSON.stringify( data ) );
	}
	
	function attachListeners () {
		var els = document.querySelectorAll( dropdownSelector );
		for( var i = 0, el; el = els[ i ]; i++ ) {
			el.addEventListener( 'click', handleDropdownClick, false );
		}
	}
	
	function block ( cont ) {
		var a = cont.querySelector( linkSelector ),
			url = a.getAttribute( 'href' ),
			title = a.innerText;
		
		data[ url ] = title;
		addClass( cont, prefix + blockedClass );
		save();
	}

	function unblock( cont ) {
		var url = getItemUrl( cont );
		delete data[ url ];
		removeClass( cont, prefix + blockedClass );
		save();
	}
	
	function getItemUrl ( el ) {
		var a = el.querySelector( linkSelector );
		return a ? a.getAttribute( 'href' ) : '';
	}

	function render() {
		var els = document.querySelectorAll( itemSelector );
		for ( var i = 0, el, url; el = els[ i ]; i++ ) {
			url = getItemUrl( el );
			if ( data[ url ] ) addClass( el, prefix + blockedClass );
		}
	}
	
	function handleDropdownClick( e ) {
		var cont = parentByClass( this, 'Box-F' );
		if ( cont.className.match( prefix + blockedClass ) ) unblock( cont );
		else block( cont );
	}
	
	return {
		init: init
	}
})();