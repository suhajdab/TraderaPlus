var traderaPlus = {

	prefix : 'traderaPlus-',
	itemSelector : '.card-list .item-card',
	version : "0.8.2",
	href : '',
	debug : false,

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
		traderaPlus.dropdown.init();
		traderaPlus.options.init();
		traderaPlus.notes.init();
		traderaPlus.items.init();
		traderaPlus.sellers.init();
		traderaPlus.summary.update();

		traderaPlus.log( 'refreshed' );
	},

	init : function () {
		traderaPlus.upgrade.init();
		traderaPlus.observer.init();
		traderaPlus.log( 'inited' );
	}
};

if ( qs( traderaPlus.itemSelector ) ) {
	window.addEventListener( 'load', traderaPlus.init, false );
}