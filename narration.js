window.FS = window.FS || {};

(function (FS) {
  var T = FS.stringsAr.narration;

  function pick(state) {
    var v = state.visits;
    var n = state.name;

    if (v === 1) { return T.firstVisit; }
    if (v <= 3) { return n ? T.returningWithName(n) : T.returningNoName; }
    if (v <= 6) { return n ? T.midWithName(n) : T.midNoName; }
    if (v <= 9) { return T.later; }
    if (v <= 14) { return T.muchLater; }
    if (v <= 20) { return T.nearlyEmpty; }
    return T.empty;
  }

  FS.narration = { pick: pick };
})(window.FS);
