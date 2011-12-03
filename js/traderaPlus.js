/*
	TODO: 
		-	balloon help like guide to where things are when first ran
		-	icons for panels on fixed control panel
		-	verify that added items, sellers are not already in list
		-	google analytics not working!
*/

var traderaPlus = ( function ( d, undefined ) {
	var legends, state, prev, data;
		
	var prefix = 'traderaPlus-',
		blockedSellerClass = 'blockedSeller',
		itemSelector = '.objectList .Box-F.listStyle';
		
	var templates = {
		dropdown: '<a data-controller="notes" data-label="{=addNote}" data-altlabel="{=removeNote}"></a>'
					+ '<a data-controller="items" data-label="{=blockItem}" data-altlabel="{=unblockItem}"></a>'
					+ '<a data-controller="sellers" data-label="{=blockSeller}" data-altlabel="{=unblockSeller}"></a>',
		guide: '<aside class="' + prefix + 'guide">{=guideText}</aside>'
	}
	
	function log ( msg ) {
		if ( typeof msg == 'object' ) {
			console.log( 'Tradera Plus: ');
			console.log( msg );
		}
		else console.log( 'Tradera Plus: ' + msg );
	}
	
	function saveState () {
		localStorage.setItem( prefix + 'state', JSON.stringify( state ) );
	}
	
	function loadState() {
		state = JSON.parse( localStorage.getItem( prefix + 'state') ) || {};
		state = defaults.extendWith( state );
	}
	
	function init() {
		loadState();
		extend();
		traderaPlus.notes.init();
		traderaPlus.items.init();
		traderaPlus.sellers.init();
		log( 'traderaPlus inited' );
	}
	
	function extend() {
		legends = d.querySelectorAll( 'legend' );
		addClass( d.querySelector( 'body' ), prefix + state.blockMode + 'blocked' );
		// add markup & classes to page
		var els = d.querySelectorAll( itemSelector );
		for( var i = 0, l = els.length; i < l; i++ ) {
			renderDropdown( els[ i ] );
		}
	}
	
	function handleDropdownClick( e ) {
		if ( e.target.nodeName != 'A' ) {
			e.stopPropagation();
			if ( prev ) prev.dataset.open = '';
			this.dataset.open = 'true';
			d.body.addEventListener( 'click', handleBodyClick, false );
			prev = this;
		}
		_gaq.push(['tp._trackEvent', e.target.dataset.controller, 'clicked']);
	}
	
	function handleBodyClick() {
		if ( prev ) prev.dataset.open = '';
		d.body.removeEventListener( 'click', handleBodyClick );
	}
	
	function renderDropdown( el ) {
		var href = el.querySelector( 'a' ).href,
			dropdown = d.createElement( 'nav' );
		dropdown.className = prefix + 'dropdown';
		dropdown.dataset.fn = 'dropdown';
		dropdown.innerHTML = tmpl( templates.dropdown, traderaPlusStrings );
		dropdown.addEventListener( 'click', handleDropdownClick, false );
		el.appendChild( dropdown );
	}
	
	var defaults = {
		blockMode: 'fade' // fade or hide
	}
	
	if ( d.querySelector( '.Box-F' ) ) window.addEventListener( 'load', init, false );
	
	return {
		prefix: prefix,
		itemSelector: itemSelector
	}
})( document );