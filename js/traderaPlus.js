var traderaPlus = {

	prefix : 'traderaPlus-',
	blockedSellerClass : 'blockedSeller',
	itemSelector : '.objectList .Box-F.listStyle',

	log : function ( msg ) {
		console.log( 'traderaPlus: ', msg );
	},

	load : function ( key ) {
		var data = JSON.parse( localStorage.getItem( traderaPlus.prefix + key ) ) || {};
		return data;
	},

	save : function ( key, data ) {
		var data = JSON.stringify( data || {} );
		localStorage.setItem( traderaPlus.prefix + key, data );
	},

	init : function () {
		traderaPlus.dropdown.init();
		traderaPlus.notes.init();
		traderaPlus.items.init();
		traderaPlus.sellers.init();
		traderaPlus.log( 'traderaPlus inited' );
	}
};

if ( qs( '.Box-F' ) ) window.addEventListener( 'load', traderaPlus.init, false );