traderaPlus.notes = ( function() {
	var data, prefix;
	
	var template = '<textarea placeholder="{=notePlaceholder}"></textarea>',
		linkSelector = '.ObjectHeadline a',
		dropdownSelector = 'a[data-controller="notes"]';
	
	function init () {
		prefix = traderaPlus.prefix,
		itemSelector = traderaPlus.itemSelector;
		
		load();
		renderNotes();
		
		var els = document.querySelectorAll( dropdownSelector );
		for( var i = 0, el; el = els[ i ]; i++ ) {
			el.addEventListener( 'click', handleDropdownClick, false );
		}
	}
	
	function load () {
		data = JSON.parse( localStorage.getItem( prefix + 'notes') ) || {};
	}
	
	function save () {
		localStorage.setItem( prefix + 'notes', JSON.stringify( data ) );
	}
	
	
	function Note ( cont ){
		var that = this;
		this.cont = cont;
		this.init();
	}
	
	Note.prototype = {
		handleEvent: function( e ) {
			var that = this;
			switch( e.type ) {
				case 'keyup': that.keyupHandler( e ); break;
			}
		},
		
		init: function() {
			this.url = getItemUrl( this.cont );
			this.build();
		},
		
		build: function () {
			var that = this,
				aside = document.createElement( 'aside' );
			aside.className = prefix + 'note';
			aside.innerHTML = tmpl( template, traderaPlusStrings );
			this.cont.appendChild( aside );
			
			var ta = this.cont.querySelector( 'textarea' );
			if ( data[ this.url ] ) ta.value = data[ this.url ];
			ta.focus();
			ta.addEventListener( 'keyup', that, false );
			this.ta = ta;
		},
		
		attach: function () {
			this.dropdown = this.cont.querySelector( dropdownSelector );
			this.dropdown.note = this;
		},
		
		delete: function () {
			this.ta.removeEventListener( 'keyup', that );
			delete data[ this.url ];
			delete this.dropdown;
		},
		
		keyupHandler: function () {
			data[ this.url ] = this.ta.value;
			save();
		}
	}
	
	function getItemUrl ( el ) {
		var a = el.querySelector( linkSelector );
		return a ? a.getAttribute( 'href' ) : '';
	}
	
	function renderNotes() {
		var els = document.querySelectorAll( itemSelector );
		for ( var i = 0, el; el = els[ i ]; i++ ) {
			if ( data[ getItemUrl( el ) ] ) {
				new Note( el );
			}
		}
	}
	
	function handleDropdownClick( e ) {
		var cont = parentByClass( this, 'Box-F' );
		if ( cont.note ) cont.note.delete();
		else new Note( cont );
	}
	
	return {
		init: init
	}
})();