traderaPlus.upgrade = (function(tp) {

  function init() {
    var v = localStorage.getItem(tp.prefix + 'version'),
      // test for data that should be in localStorage from day 1
      savedData = !!tp.load('sellers');

    // versions match or this is first time extension is run
    if (v === tp.version) return;

    // no saved version number means pre 0.8.1
    if (!v && savedData) {
      clearData();
    }

    /*
        further upgrade logic
     */

    localStorage.setItem(tp.prefix + 'version', tp.version);

    tp.log('upgraded from version ' + v + ' to ' + tp.version);
		_gaq && _gaq.push(['_trackEvent', v + ' to ' + tp.version, 'upgraded']);
  }

  function clearData() {
    alert(traderaPlusStrings.clearalert);
    ['items', 'notes', 'sellers'].forEach(function(key) {
      localStorage.removeItem(tp.prefix + key);
    });
  }

  return {
    init: init
  }
})(traderaPlus);
