traderaPlus.dialog = ( function ( d, undefined ) {

	var prefix, isSetup;

	var template = '<aside id="{=prefix}dialog><header></header><article></article></aside>';

	function setup () {
		prefix = traderaPlus.prefix;
		debugger
		var frag = d.createDocumentFragment();
		frag.innerHTML = tmpl( template, { prefix: prefix } );
		d.body.appendChild( frag );
		isSetup = true;
	}

	function open ( d ) {
		if ( !isSetup ) setup();
	}

	return {
		open: open,
		close: close
	}

})( document );