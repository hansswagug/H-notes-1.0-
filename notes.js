window.Notes = window.Notes || {};

(function (N) {
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function createDefaultState() { return { notes: [] }; }

  function normalize(raw) {
    if (!raw || typeof raw !== 'object' || !Array.isArray(raw.notes)) {
      return createDefaultState();
    }
    raw.notes = raw.notes
      .filter(function (n) { return n && typeof n === 'object' && typeof n.id === 'string'; })
      .map(function (n) {
        var now = Date.now();
        return {
          id: n.id,
          title: typeof n.title === 'string' ? n.title : '',
          body:  typeof n.body  === 'string' ? n.body  : '',
          tags:  Array.isArray(n.tags)
                   ? n.tags.filter(function (t) { return typeof t === 'string' && t.length; })
                   : [],
          color: typeof n.color === 'string' ? n.color : 'default',
          pinned: !!n.pinned,
          createdAt: typeof n.createdAt === 'number' ? n.createdAt : now,
          updatedAt: typeof n.updatedAt === 'number' ? n.updatedAt : now
        };
      });
    return raw;
  }

  function load() { return normalize(N.storage.load()); }
  function persist(state) { N.storage.save(state); }

  function findById(state, id) {
    for (var i = 0; i < state.notes.length; i++) {
      if (state.notes[i].id === id) return state.notes[i];
    }
    return null;
  }

  function addNote(state, data) {
    var now = Date.now();
    var note = {
      id: uid(),
      title: data.title || '',
      body:  data.body  || '',
      tags:  data.tags  || [],
      color: data.color || 'default',
      pinned: false,
      createdAt: now,
      updatedAt: now
    };
    state.notes.unshift(note);
    return note;
  }

  function updateNote(state, id, data) {
    var note = findById(state, id);
    if (!note) return null;
    if (typeof data.title === 'string') note.title = data.title;
    if (typeof data.body  === 'string') note.body  = data.body;
    if (Array.isArray(data.tags))       note.tags  = data.tags;
    if (typeof data.color === 'string') note.color = data.color;
    note.updatedAt = Date.now();
    return note;
  }

  function deleteNote(state, id) {
    var idx = state.notes.findIndex(function (n) { return n.id === id; });
    if (idx === -1) return false;
    state.notes.splice(idx, 1);
    return true;
  }

  function togglePin(state, id) {
    var note = findById(state, id);
    if (!note) return null;
    note.pinned = !note.pinned;
    note.updatedAt = Date.now();
    return note;
  }

  function allTags(state) {
    var counts = {};
    state.notes.forEach(function (n) {
      n.tags.forEach(function (t) { counts[t] = (counts[t] || 0) + 1; });
    });
    return Object.keys(counts).sort().map(function (t) {
      return { name: t, count: counts[t] };
    });
  }

  function filterNotes(state, filter, query) {
    var q = (query || '').trim().toLowerCase();
    return state.notes
      .filter(function (n) {
        if (filter.type === 'pinned' && !n.pinned) return false;
        if (filter.type === 'tag' && n.tags.indexOf(filter.value) === -1) return false;
        if (q) {
          var hay = (n.title + ' ' + n.body + ' ' + n.tags.join(' ')).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      })
      .sort(function (a, b) {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
  }

  function parseTags(input) {
    var seen = {};
    return String(input || '')
      .split(',')
      .map(function (t) { return t.trim(); })
      .filter(function (t) {
        if (!t || seen[t]) return false;
        seen[t] = true;
        return true;
      });
  }

  N.notes = {
    load: load, persist: persist,
    findById: findById,
    addNote: addNote, updateNote: updateNote, deleteNote: deleteNote, togglePin: togglePin,
    allTags: allTags, filterNotes: filterNotes, parseTags: parseTags
  };
})(window.Notes);
