window.FS = window.FS || {};

(function (FS) {
  var cfg = FS.config;

  function createDefault() {
    return {
      visits: 0,
      name: '',
      hadName: false,
      memories: [],
      lost: [],
      forgotten: 0,
      born: Date.now()
    };
  }

  function normalize(raw) {
    if (!raw || typeof raw !== 'object' || !Array.isArray(raw.memories)) {
      return createDefault();
    }
    if (!Array.isArray(raw.lost)) { raw.lost = []; }
    if (typeof raw.forgotten !== 'number') { raw.forgotten = 0; }
    return raw;
  }

  function loadInitial() {
    return normalize(FS.storage.load());
  }

  // تزيد الزيارات، وتطبّق قاعدة النسيان، وتعيد ما نُسي في هذه الزيارة.
  function advance(state) {
    var out = { justForgotten: null, justForgotName: false };

    state.visits += 1;

    if (state.visits > cfg.forgetStartVisit && state.memories.length > 0) {
      var idx = Math.floor(Math.random() * state.memories.length);
      var removed = state.memories.splice(idx, 1)[0];
      state.forgotten += 1;
      state.lost.unshift({ t: removed.t, v: state.visits });
      if (state.lost.length > cfg.lostMaxEntries) {
        state.lost.length = cfg.lostMaxEntries;
      }
      out.justForgotten = removed;
    }

    if (state.visits >= cfg.forgetNameVisit && state.name) {
      state.hadName = true;
      state.name = '';
      out.justForgotName = true;
    }

    return out;
  }

  function addMemory(state, text) {
    state.memories.push({ t: text, v: state.visits });
  }

  function setName(state, name) {
    state.name = name;
    state.hadName = true;
  }

  function severityFor(visits) {
    var s = 0;
    for (var i = 0; i < cfg.rotThresholds.length; i++) {
      if (visits >= cfg.rotThresholds[i].minVisits) {
        s = cfg.rotThresholds[i].severity;
      }
    }
    return s;
  }

  FS.state = {
    loadInitial: loadInitial,
    advance: advance,
    addMemory: addMemory,
    setName: setName,
    severityFor: severityFor
  };
})(window.FS);
