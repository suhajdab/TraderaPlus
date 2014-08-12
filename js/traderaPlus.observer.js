traderaPlus.observer = ( function ( tp ) {

	var observer,
		options = {
			subtree: true,
			childList: true,
			attributes: false,
			characterData: false
		};

	function init () {
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		observer = new MutationObserver(debounce( onMutation, 250 ));
		observe();

		tp.log( 'observer inited' );
	}

	function onMutation( mutations, observer ) {
		// fired when a mutation occurs
		tp.log( mutations, observer );
		tp.refresh();
	}

	function pause () {
		observer.disconnect();
		tp.log( 'observer paused' );
	}

	function observe () {
		observer.observe( document, options );
		tp.log( 'observer resumed' );
	}

	return {
		pause: pause,
		resume: observe,
		init: init
	};

}) ( traderaPlus );