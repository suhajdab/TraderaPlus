/*
 	TODO:
		- class change on item to show alternate menu label
 */
traderaPlus.notes = ( function() {
	var data, prefix;
	
	var template = '<textarea placeholder="{=notePlaceholder}"></textarea>',
		controller = 'notes',
		linkSelector = '.ObjectHeadline a',
		hasNoteClass = 'hasNote',
		dropdownSelector = 'a[data-controller="' + controller + '"]';
	
	function init () {
		prefix = traderaPlus.prefix;
		itemSelector = traderaPlus.itemSelector;
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
			this.url = getItemUrl( this.cont );
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
			
			this.lh = parseInt( getComputedStyle( ta, null).lineHeight, 10 );
				
			if ( data[ this.url ] ) { 
				ta.value = data[ this.url ];
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
			delete data[ this.url ];
			save();
		},
		
		keyupHandler: function () {
			data[ this.url ] = this.ta.value;
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
	}
	
	function getItemUrl ( el ) {
		var a = el.querySelector( linkSelector );
		return a ? a.getAttribute( 'href' ) : '';
	}
	
	function renderNotes() {
		var els = document.querySelectorAll( itemSelector );
		for ( var i = 0, el, url; el = els[ i ]; i++ ) {
			url = getItemUrl( el );
			if ( data[ getItemUrl( el ) ] ) {
				el.note = new Note( el );
			}
		}
	}
	
	function handleDropdownClick( e ) {
		var cont = parentByClass( this, 'Box-F' );
		if ( cont.className.match( prefix + hasNoteClass ) ) cont.note.delete();
		else cont.note = new Note( cont, true );
	}
	
	return {
		init: init
	}
})();