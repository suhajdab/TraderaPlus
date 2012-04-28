﻿/*
	TODO: 
		-	balloon help like guide to where things are when first ran
		-	icons for panels on fixed control panel
		-	verify that added items, sellers are not already in list
		-	google analytics not working!
*/

traderaPlus.dropdown = ( function ( tp ) {
	var prev, data;
		
	var templates = {
		dropdown: '<a data-controller="notes" data-label="{=addNote}" data-altlabel="{=removeNote}"></a>'
					+ '<a data-controller="items" data-label="{=blockItem}" data-altlabel="{=unblockItem}"></a>'
					+ '<a data-controller="sellers" data-label="{=blockSeller}" data-altlabel="{=unblockSeller}"></a>'
					+ '<a data-controller="options" data-label="{=option_hideBlocked}"></a>'
	}
	
	function init() {
		// add markup & classes to page
		qsa( tp.itemSelector ).forEach( renderDropdown );
	}
	
	function handleDropdownClick( e ) {
		if ( e.target.nodeName != 'A' ) {
			e.stopPropagation();
			if ( prev ) prev.dataset.open = '';
			this.dataset.open = 'true';
			document.body.addEventListener( 'click', handleBodyClick, false );
			prev = this;
		}
		_gaq && _gaq.push([ 'tp._trackEvent', e.target.dataset.controller, 'clicked' ]);
	}
	
	function handleBodyClick() {
		if ( prev ) prev.dataset.open = '';
		document.body.removeEventListener( 'click', handleBodyClick );
	}
	
	function renderDropdown( el ) {
		var href = el.querySelector( 'a' ).href,
			dropdown = document.createElement( 'nav' );
		dropdown.className = tp.prefix + 'dropdown';
		dropdown.dataset.fn = 'dropdown';
		dropdown.innerHTML = tmpl( templates.dropdown, traderaPlusStrings );
		dropdown.addEventListener( 'click', handleDropdownClick, false );
		el.appendChild( dropdown );
	}

	return {
		init: init
	}

})( traderaPlus );