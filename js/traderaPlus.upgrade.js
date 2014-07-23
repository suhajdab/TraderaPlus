traderaPlus.upgrade = ( function( tp ) {

	function init () {
		var v = localStorage.getItem( tp.prefix + 'version' );
		if ( v === tp.version ) return;
		if ( !v ) {
			clearData();
		}

		localStorage.setItem( tp.prefix + 'version', tp.version );
	}

	function clearData () {
		alert( traderaPlusStrings.clearalert );
		['items','notes','sellers'].forEach( function ( key ) {
			tp.save( key );
		});
	}

	return {
		init: init
	}
})( traderaPlus );