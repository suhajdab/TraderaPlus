var traderaPlus = {

	prefix : 'traderaPlus-',
	itemSelector : '.card-list .item-card',
	version : "0.8.1",
	href : '',
	debug : true,

	log : function ( msg ) {
		if ( traderaPlus.debug ) console.log( 'traderaPlus: ', msg );
	},

	load : function ( key ) {
		var data = JSON.parse( localStorage.getItem( traderaPlus.prefix + key ) );
		return data;
	},

	save : function ( key, data ) {
		var data = JSON.stringify( data );
		localStorage.setItem( traderaPlus.prefix + key, data );
	},

	refresh : function () {
		traderaPlus.upgrade.init();
		traderaPlus.dropdown.init();
		traderaPlus.options.init();
		traderaPlus.notes.init();
		traderaPlus.items.init();
		traderaPlus.sellers.init();

		traderaPlus.log( 'traderaPlus refreshed' );
	},

	init : function () {
		traderaPlus.observer.init();
		traderaPlus.log( 'traderaPlus inited' );
	}
};

if ( qs( traderaPlus.itemSelector ) ) {
	window.addEventListener( 'load', traderaPlus.init, false );
}