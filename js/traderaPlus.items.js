traderaPlus.items = (function(tp) {
  var data, blockedCount = 0;

  var controller = 'items',
    idAttr = 'data-item-id',
    dropdownSelector = 'a[data-controller="' + controller + '"]',
    blockedClass = 'blockedItem';


  function init() {
    data = tp.load(controller) || [];
    render();
    qsa(dropdownSelector).forEach(attachListener);
  }

  function save() {
    tp.save(controller, data);
  }

  function attachListener(el) {
    el.addEventListener('click', handleDropdownClick, false);
  }

  function block(cont) {
    var id = getItemId(cont);

    data.push(id);
    cont.classList.add(tp.prefix + blockedClass);
    blockedCount++;
    save();

    tp.summary.update();
    tp.log('item blocked');
  }

  function unblock(cont) {
    var id = getItemId(cont),
      i = data.indexOf(id);

    if (i !== -1) {
      data.splice(i, 1);
      save();
      cont.classList.remove(tp.prefix + blockedClass);
      blockedCount--;

      tp.summary.update();
    }
  }

  function getItemId(el) {
    return el.getAttribute(idAttr);
  }

  function render() {
    blockedCount = 0;
    qsa(tp.itemSelector).forEach(function(el) {
      id = getItemId(el);
      if (id && data.indexOf(id) !== -1) {
        el.classList.add(tp.prefix + blockedClass);
        blockedCount++;
      }
    });
    tp.summary.update();
    tp.log('items blocked :' + blockedCount);
  }

  function handleDropdownClick() {
    var cont = parentByClass(this, 'item-card');
    if (cont.className.match(tp.prefix + blockedClass)) unblock(cont);
    else block(cont);
		
    _gaq && _gaq.push(['_trackEvent', 'block item', 'clicked']);
  }

  return {
    init: init,
    getBlockedCount: function() {
      return blockedCount;
    }
  };

})(traderaPlus);
