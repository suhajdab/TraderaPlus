/*
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
	};
	
	function init() {
		tp.observer.pause();

		// add markup & classes to page
		qsa( tp.itemSelector ).forEach( renderDropdown );

		tp.observer.resume();
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
		var dropdownClass = tp.prefix + 'dropdown';
		if ( qs( '.' + dropdownClass, el )) return;

		var dropdown = document.createElement( 'nav' );
		dropdown.className = dropdownClass
		dropdown.dataset.fn = 'dropdown';
		dropdown.innerHTML = tmpl( templates.dropdown, traderaPlusStrings );
		dropdown.title = 'Tradera+';
		dropdown.addEventListener( 'click', handleDropdownClick, false );
		qs( '.item-card-body', el ).appendChild( dropdown );
	}

	return {
		init: init
	}

})( traderaPlus );