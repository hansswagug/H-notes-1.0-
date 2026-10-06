window.Notes = window.Notes || {};

(function (N) {
  function svg(paths, size) {
    size = size || 20;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '"'
      + ' fill="none" stroke="currentColor" stroke-width="1.8"'
      + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + paths + '</svg>';
  }

  var I = {
    search: function (s) {
      return svg('<circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/>', s);
    },
    plus: function (s) {
      return svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', s);
    },
    globe: function (s) {
      return svg(
        '<circle cx="12" cy="12" r="9"/>'
        + '<path d="M3 12h18"/>'
        + '<path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>',
        s
      );
    },
    pinFilled: function (s) {
      return '<svg viewBox="0 0 24 24" width="' + (s||20) + '" height="' + (s||20) + '"'
        + ' fill="currentColor" stroke="currentColor" stroke-width="1.5"'
        + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + '<path d="M14 3l7 7-2 2-1.5-1.5-3.5 3.5v3l-2 2-3-3-4 4-1-1 4-4-3-3 2-2h3l3.5-3.5L10 5z"/>'
        + '</svg>';
    },
    pinOutline: function (s) {
      return svg(
        '<path d="M14 3l7 7-2 2-1.5-1.5-3.5 3.5v3l-2 2-3-3-4 4-1-1 4-4-3-3 2-2h3l3.5-3.5L10 5z"/>',
        s
      );
    },
    trash: function (s) {
      return svg(
        '<path d="M4 7h16"/>'
        + '<path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>'
        + '<path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/>'
        + '<line x1="10" y1="11" x2="10" y2="17"/>'
        + '<line x1="14" y1="11" x2="14" y2="17"/>',
        s
      );
    },
    x: function (s) {
      return svg('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>', s);
    },
    check: function (s) {
      return svg('<polyline points="5 13 10 18 19 7"/>', s);
    },
    tag: function (s) {
      return svg(
        '<path d="M3 12l9-9h7a2 2 0 0 1 2 2v7l-9 9a2 2 0 0 1-2.8 0L3 14.8a2 2 0 0 1 0-2.8z"/>'
        + '<circle cx="15" cy="9" r="1.2"/>',
        s
      );
    }
  };

  N.icons = I;
})(window.Notes);
