/*
	TODO: 
		-	balloon help like guide to where things are when first ran
		-	icons for panels on fixed control panel
		-	verify that added items, sellers are not already in list
		-	change menu when item blocked, note added
		-	modify rendering items to searching in js data ( rather than searching for elements in data )
*/


( function ( d, undefined ) {
	var legends, state, prev, data;
		
	var prefix = 'traderaPlus-',
		blockedSellerClass = 'blockedSeller',
		blockedItemClass = 'blockedItem';
		
	var templates = {
		dropdown: '<a data-fn="addNote" data-label="{=addNote}" data-altlabel="{=removeNote}"></a>'
					+ '<a data-fn="addBlockedItem" data-label="{=blockItem}" data-altlabel="{=unblockItem}"></a>'
					+ '<a data-fn="addBlockedSeller" data-label="{=blockSeller}" data-altlabel="{=unblockSeller}"></a>',
		note: '<textarea placeholder="{=notePlaceholder}"></textarea>',
		guide: '<aside class="' + prefix + 'guide">{=guideText}</aside>'
	}
	
	function log( msg ) {
		if ( typeof msg == 'object' ) {
			console.log( 'Tradera Plus: ');
			console.log( msg );
		}
		else console.log( 'Tradera Plus: ' + msg );
	}
	
	function saveState () {
		localStorage.setItem( prefix + 'state', JSON.stringify( state ) );
		log(state)
	}
	
	function loadState() {
		state = JSON.parse( localStorage.getItem( prefix + 'state') ) || {};
		state = defaults.extendWith( state );
		log(state);
	}
	
	function saveData () {
		localStorage.setItem( prefix + 'data', JSON.stringify( data ) );
		log(data)
	}
	
	function loadData() {
		data = JSON.parse( localStorage.getItem( prefix + 'data') ) || { blockedItems:[], blockedSellers:[], notes:{} };
		log( data );
	}
	
	function init() {
		loadState();
		loadData();
		renderBlockedItems();
		renderBlockedSellers();
		extend();
		log( 'inited' );
	}
	
	function extend() {
		legends = d.querySelectorAll( 'legend' );
		addClass( d.querySelector( 'body' ), prefix + state.blockMode + 'blocked' );
		// add markup & classes to page
		var els = d.querySelectorAll( '.objectList .Box-F.listStyle' );
		for( var i = 0, l = els.length; i < l; i++ ) {
			renderDropdown( els[ i ] );
		}
	}
	
	function handleDropdownClick( e ) {
		if ( e.target.nodeName == 'A' ) {
			var parent = parentByClass( el, 'Box-F');
			
			switch(e.target.dataset.fn){
				case 'addNote':
					notes.toggle( parent );
					break;
				case 'addBlockedItem':
					addBlockedItem( parent );
					break;
				case 'addBlockedSeller':
					addBlockedSeller( parent );
					break;
			}
		} else {
			e.stopPropagation();
			if ( prev ) prev.dataset.open = '';
			this.dataset.open = 'true';
			d.body.addEventListener( 'click', handleBodyClick, false );
			prev = this;
		}
		_gaq.push(['_trackEvent', e.target.dataset.fn, 'clicked']);
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
	
	function openPanel() {
		if ( state.openFieldset >= 0) legends[ state.openFieldset ].parentNode.className = 'expanded';
	
		for ( var i = 0, l = legends.length; i < l; i++ ) {
			legends[ i ].addEventListener( 'click', legendClickHandler, false );
		}
	}
	
	function legendClickHandler () {
		for ( var i = 0, l = legends.length; i < l; i++ ) {
			if ( legends[ i ] == this ){
				var fs = this.parentNode;
				if ( fs.className == '' ){
					fs.className = 'expanded';
					state.openFieldset = i;
				} else {
					fs.className = '';
					state.openFieldset = -1;
				}
			} else {
				legends[ i ].parentNode.className = '';
			}
		}
		saveState();
	}
	
	function addBlockedItem( el ) {
		var a = el.querySelector( '.ObjectHeadline a'),
			url = a.getAttribute( 'href' ),
			title = a.innerText,
			src = el.querySelector( '.imageHolder img' ).src,
			d = {
				src: src,
				title: title,
				url: url
			},
			i = data.blockedItems.indexOf( d );
		if ( i === -1 ) data.blockedItems.push( d );
		else data.blockedItems.splice( i, 1 );
		renderBlockedItems();
		saveData();
	}
	
	function removeBlockedItem( url ) {
		for ( var i = 0, b; b = data.blockedItems[ i ]; i++ ) {
			if ( b.url == url ) {
				data.blockedItems.splice( i, 1 );
				break;
			}
		}
		renderBlockedItems();
	}
	
	function renderBlockedItems() {
		var oldBlocked = d.querySelectorAll( '.' + prefix + blockedItemClass );
		for ( var i = 0, l = oldBlocked; i < l; i++ ) removeClass( oldBlocked[ i ], prefix + blockedItemClass );
		for ( var i = 0, b; b = data.blockedItems[ i ]; i++ ) {
			var el = d.querySelector( '.objectList .Box-F.listStyle a[href="' + b.url+ '"]' );
			if ( el ) {
				var parent = parentByClass( el, 'Box-F');
				addClass( parent, prefix + blockedItemClass );
			}
		}
	}
	
	function isBlocked( el ) {
		return parentByClass( el, prefix + blockedItemClass ) && true;
	}

	function addBlockedSeller( el ) {
		var a = el.querySelector( '.seller a'),
			url = a.getAttribute( 'href' ),
			title = a.innerText
		data.blockedSellers.push({
			title: title,
			url: url
		});
		renderBlockedSellers();
		saveData();
	}
	
	function removeBlockedSellers( url ) {
		for ( var i = 0, b; b = data.blockedSellers[ i ]; i++ ) {
			if ( b.url == url ) {
				data.blockedSellers.splice( i, 1 );
				break;
			}
		}
		renderBlockedItems();
	}
	
	function renderBlockedSellers() {
		var oldBlocked = d.querySelectorAll( '.' + prefix + blockedSellerClass );
		for ( var i = 0, l = oldBlocked; i < l; i++ ) removeClass( oldBlocked[ i ], prefix + blockedSellerClass );
		for ( var i = 0, b; b = data.blockedSellers[ i ]; i++ ) {
			var els = d.querySelectorAll( '.objectList .Box-F.listStyle a[href="' + b.url+ '"]' );
			for ( var j = 0, el; el = els[ j ]; j++ ) {
				parent = parentByClass( el, 'Box-F');
				addClass( parent, prefix + blockedSellerClass );
			}
		}
	}
	
	var notes = {
		toggle: function ( el, value ) {
			var a = el.querySelector( '.seller a' ),
				url = a.getAttribute( 'href' ),
				aside = document.createElement( 'aside' );
			aside.className = prefix + 'note';
			aside.innerHTML = tmpl( templates.note, traderaPlusStrings );
			el.appendChild( aside );
			var ta = el.querySelector( 'textarea' );
			ta.url = url;
			ta.value = value || '';
			ta.focus();
			ta.addEventListener( 'keyup', notes.keyupHandler );
		},
		
		keyupHandler: function() {
			data.notes[ this.url ] = this.value;
			saveData();
		}
	}

	function renderNotes () {
		var els = d.querySelectorAll( '.objectList .Box-F.listStyle' );
		for ( var i = 0, el; el = els[ i ]; i++ ) {
			var a = el.querySelector( '.seller a' ),
				url = a.getAttribute( 'href' );
			if ( data.notes[ url ] ) notes.toggle ( el, data.notes[ url ] );
		}
	}
	
	var defaults = {
		openFieldset: 0,
		blockMode: 'fade' // fade or hide
	}
	
	if ( d.querySelector( '.Box-F' ) ) init();
})( document );