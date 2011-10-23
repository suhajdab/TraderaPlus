// TODO: growl like notification to user

( function ( d, undefined ) {
	var legends = d.querySelectorAll( 'legend' ),
		state, prev,
		data = JSON.parse( localStorage.getItem('traderaExpander-data') ) || {};
		
	var prefix = 'traderaExtender-',
		blockedClass = 'blocked';
	
	function log( msg ) {
		if ( typeof msg == 'object' ) {
			console.log( 'Tradera Extender: ');
			console.log( msg );
		}
		else console.log( 'Tradera Extender: ' + msg );
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
	
	function init() {
		loadState();
		extend();
		log( 'inited' );
	}
	
	function extend() {
		addClass( d.querySelector( 'body' ), prefix + state.blockPresentation + 'blocked' );
		// add markup & classes to page
		var els = d.querySelectorAll( '.objectList .Box-F.listStyle' );
		for( var i = 0, l = els.length; i < l; i++ ) {
			renderDropdown( els[ i ] );
		}
	}
	
	function handleDropdownClick( e ) {
		if ( e.target.nodeName == 'A' ) {
			var notification = webkitNotifications.createNotification(
			  'icon.png',  // icon url - can be relative
			  'e.target.dataset.fn',  // notification title
			  e.target.dataset.fn  // notification body text
			);
			
			notification.show();
			switch(e.target.dataset.fn){
				case 'addNote':
					addNote( this );
					break;
				case 'addBlockedItem':
					addBlockedItem( this );
					break;
				case 'addBlockedUser':
					addBlockedUser( this );
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
	//	TODO: close on outside or other dropdown click
	function handleBodyClick() {
		if ( prev ) prev.dataset.open = '';
		d.body.removeEventListener( 'click', handleBodyClick );
	}
	
	function renderDropdown( el ) {
		var href = el.querySelector( 'a' ).href,
			dropdown = d.createElement( 'div' );
		dropdown.className = prefix + 'dropdown';
		dropdown.dataset.fn = 'dropdown';
		dropdown.innerHTML = '<a data-fn="addNote">Add note</a><a data-fn="addBlockedItem">Block item</a><a data-fn="addBlockedUser">Block user</a><a>Show control panel</a>';
		dropdown.addEventListener( 'click', handleDropdownClick, false );
		el.appendChild( dropdown );
	}
	
	function openPanel() {
		if ( state.openFieldset >= 0) legends[ state.openFieldset ].parentNode.className = 'expanded';
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
	
	for ( var i = 0, l = legends.length; i < l; i++ ) {
		legends[ i ].addEventListener( 'click', legendClickHandler, false );
	}
	
	function addBlockedItem( el ) {
		var parent = parentByClass( el, 'Box-F');
			addClass( parent, prefix + blockedClass );
	}
	
	function removeBlockedItem( id ) {
		
	}
	
	function renderBlockedItems() {
		var blocked = d.querySelectorAll( '.' + prefix + blockedClass );
		for ( var i = 0, l = blocked; i < l; i++ ) removeClass( blocked[ i ], prefix + blockedClass );
		for ( var i = 0, l = data.blocked.length; i < l; i++ ) {
			var el = d.querySelector( '.objectList .Box-F.listStyle a[href="' + data.blocked[ i ].url+ '"]' ),
				parent = parentByClass( el, 'Box-F');
			addClass( parent, prefix + blockedClass );
		}
	}
	data.blocked = [{
		url: '/Vackraste-skapet-saa-fint-shabby-chic-lantligt-hylla--auktion_341130_141017621',
		thumbnail: 'http://listthumb.tradera.com/782/130662782_1.jpg',
		title: 'Vackraste skåpet, såå fint!!!/shabby chic/lantligt/hylla/'
	}];
	
	
	function addNote( el ) {
		log( 'addNote' );
	}
	
	var defaults = {
		openFieldset: 0,
		blockPresentation: 'fade' // fade or hide
	}
	
	init();
})( document );