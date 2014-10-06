var traderaPlus = {

	prefix : 'traderaPlus-',
	itemSelector : '.card-list .item-card',
	version : "0.8.2.1",
	href : '',

	log : function ( msg ) {
		if ( !!localStorage.getItem( traderaPlus.prefix + 'debug' ) ) console.log( 'traderaPlus: ', msg );
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

window.addEventListener( 'load', traderaPlus.init );
