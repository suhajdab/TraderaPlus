/*
 	TODO:
		- class change on item to show alternate menu label
 */
traderaPlus.notes = ( function( tp ) {
	var data, prefix;
	
	var template = '<textarea placeholder="{=notePlaceholder}"></textarea>',
		controller = 'notes',
		idAttr = 'data-item-id',
		hasNoteClass = 'hasNote',
		dropdownSelector = 'a[data-controller="' + controller + '"]';
	
	function init () {
		prefix = tp.prefix;
		load();
		renderNotes();
		attachListeners();
	}
	
	function load () {
		data = JSON.parse( localStorage.getItem( prefix + controller ) ) || {};
	}
	
	function save () {
		localStorage.setItem( prefix + controller, JSON.stringify( data ) );
	}
	
	function attachListeners () {
		var els = document.querySelectorAll( dropdownSelector );
		for( var i = 0, el; el = els[ i ]; i++ ) {
			el.addEventListener( 'click', handleDropdownClick, false );
		}
	}
	
	
	function Note ( cont, autofocus ){
		this.cont = cont;
		this.autofocus = autofocus || false;
		this.init();
	}
	
	Note.prototype = {
		handleEvent: function( e ) {
			switch( e.type ) {
				case 'keyup': this.keyupHandler( e ); break;
			}
		},
		
		init: function() {
			this.id = getItemId( this.cont );
			this.build();
			this.activate();
		},
		
		build: function () {
			var aside = document.createElement( 'aside' );
			aside.className = prefix + 'note';
			aside.innerHTML = tmpl( template, traderaPlusStrings );
			this.cont.appendChild( aside );
		},
		
		activate: function () {
			var that = this,
				ta = this.cont.querySelector( 'textarea' );
			
			this.lh = parseInt( getComputedStyle( ta, null ).lineHeight, 10 );
				
			if ( data[ this.id ] ) {
				ta.value = data[ this.id ];
				this.autogrow( ta );
			}
			if ( this.autofocus ) ta.focus();
			ta.addEventListener( 'keyup', that, false );
			this.ta = ta;
			
			addClass( this.cont, prefix + hasNoteClass );
		},
		
		delete: function () {
			this.ta.removeEventListener( 'keyup', this );
			this.cont.removeChild( this.ta.parentNode );
			removeClass( this.cont, prefix + hasNoteClass );
			delete data[ this.id ];
			save();
		},
		
		keyupHandler: function () {
			data[ this.id ] = this.ta.value;
			this.autogrow( this.ta );
			save();
		},
		
		autogrow: function ( el ) {
			var newHeight = el.scrollHeight,
	            currentHeight = el.clientHeight;
	        if (newHeight > currentHeight) {
	            el.style.height = newHeight + 3 * this.lh + "px";
	        }
		}
	};

	function getItemId ( el ) {
		return el.getAttribute( idAttr );
	}
	
	function renderNotes() {
		tp.observer.pause();

		var els = document.querySelectorAll( tp.itemSelector );
		for ( var i = 0, el, id; el = els[ i ]; i++ ) {
			id = getItemId( el );
			if ( data[ id ] ) {
				el.note = new Note( el );
			}
		}

		tp.observer.resume();
	}
	
	function handleDropdownClick() {
		var cont = parentByClass( this, 'item-card' );
		if ( cont.className.match( prefix + hasNoteClass ) ) cont.note.delete();
		else cont.note = new Note( cont, true );
		_gaq && _gaq.push(['_trackEvent', 'add note', 'clicked']);
	}
	
	return {
		init: init
	}
})( traderaPlus );