traderaPlus.options = ( function ( tp ) {

	var data;

	var controller = 'options';

	/*
	var template = '<fieldset><legend>{=blockModeLegend}</legend>'
				+ '<label>{=blockModeFade}><input type="radio" name="blockMode" value="fade"/></label>'
				+'<label>{=blockModeHide}><input type="radio" name="blockMode" value="hide"/></label>'
				+ '</fieldset>';
	*/

	function init () {
		data = tp.load( controller ) || {};
		data = defaults.extendWith( data );
		setBlockMode();
		var dropdownSelector = 'a[data-controller="' + controller + '"]';
		qsa( dropdownSelector ).forEach( attachListener );
	}

	function attachListener ( el ) {
		el.addEventListener( 'click', handleDropdownClick, false );
	}

	function handleDropdownClick ( e ) {
		data.blockMode = data.blockMode == 'fade' ? 'hide' : 'fade';
		setBlockMode();
		tp.save( controller, data );
		_gaq && _gaq.push(['_trackEvent', data.blockMode + 'blocked', 'clicked']);
	}

	function setBlockMode() {
		removeClass( document.body, tp.prefix + 'hideblocked' );
		removeClass( document.body, tp.prefix + 'fadeblocked' );
		addClass( document.body, tp.prefix + data.blockMode + 'blocked' );
	}

	var defaults = {
		blockMode: 'fade' // fade or hide
	};

	return {
		init: init
	}

})( traderaPlus );
