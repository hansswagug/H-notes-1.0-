window.Notes = window.Notes || {};

window.Notes.stringsEn = {
  _dir: 'ltr',
  _title: 'Notes',

  appTitle: 'Notes',
  searchPlaceholder: 'Search notes…',
  newNote: 'New note',
  langToggle: 'Switch to العربية',

  filters: {
    all: 'All notes',
    pinned: 'Pinned',
    tags: 'Tags',
    empty: 'No notes yet.',
    noResults: 'No matches.'
  },

  list: {
    empty: 'No notes yet. Create your first one.',
    noResults: 'No notes match your search.',
    untitled: 'Untitled',
    pinnedBadge: 'Pinned'
  },

  editor: {
    newTitle: 'New note',
    editTitle: 'Edit note',
    titlePlaceholder: 'Title',
    bodyPlaceholder: 'Write something…',
    tagsLabel: 'Tags (comma separated)',
    tagsPlaceholder: 'work, personal, ideas',
    colorLabel: 'Color',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    pin: 'Pin',
    unpin: 'Unpin',
    deleteConfirm: 'Delete this note? This cannot be undone.'
  },

  toast: {
    saved: 'Saved',
    deleted: 'Deleted',
    pinned: 'Pinned',
    unpinned: 'Unpinned'
  },

  time: {
    now: 'just now',
    minutesAgo: function (n) { return n + 'm ago'; },
    hoursAgo:   function (n) { return n + 'h ago'; },
    daysAgo:    function (n) { return n + 'd ago'; }
  }
};
