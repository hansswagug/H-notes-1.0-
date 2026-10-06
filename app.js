window.Notes = window.Notes || {};

(function (N) {
  var cfg = N.config;
  var I   = N.icons;

  var state = N.notes.load();

  var ui = {
    filter: { type: 'all', value: '' },
    query: '',
    view: 'list',
    editingId: null,
    editingColor: 'default',
    notice: null
  };

  var els = {
    filters:  document.getElementById('filters'),
    main:     document.getElementById('main'),
    search:   document.getElementById('search'),
    newNote:  document.getElementById('newNote'),
    appTitle: document.getElementById('appTitle'),
    toast:    document.getElementById('toast'),
    langBtn:  document.getElementById('langBtn'),
    langIcon: document.getElementById('langIcon'),
    searchIcon: document.getElementById('searchIcon'),
    newIcon:  document.getElementById('newIcon'),
    newLabel: document.getElementById('newLabel')
  };

  var toastTimer = null;

  /* ---------- init ---------- */

  function init() {
    N.i18n.applyDocument();
    els.searchIcon.innerHTML = I.search(18);
    els.langIcon.innerHTML   = I.globe(20);
    els.newIcon.innerHTML    = I.plus(18);

    bindGlobalEvents();
    applyStaticTexts();
    render();
  }

  function applyStaticTexts() {
    var s = N.i18n.get();
    els.appTitle.textContent      = s.appTitle;
    els.search.placeholder        = s.searchPlaceholder;
    els.newLabel.textContent      = s.newNote;
    els.langBtn.title             = s.langToggle;
    els.langBtn.setAttribute('aria-label', s.langToggle);
  }

  function bindGlobalEvents() {
    els.search.addEventListener('input', function () {
      ui.query = els.search.value;
      if (ui.view === 'edit') goToList();
      render();
    });

    els.newNote.addEventListener('click', function () {
      ui.view = 'edit';
      ui.editingId = null;
      ui.editingColor = 'default';
      render();
      var input = els.main.querySelector('.input-title');
      if (input) input.focus();
    });

    els.langBtn.addEventListener('click', function () {
      N.i18n.toggle();
      N.i18n.applyDocument();
      applyStaticTexts();
      render();
    });
  }

  /* ---------- render ---------- */

  function render() {
    els.filters.innerHTML = N.render.renderFilters(state, ui.filter);
    els.main.innerHTML = ui.view === 'edit'
      ? N.render.renderEditor(state, ui.editingId)
      : N.render.renderList(state, ui.filter, ui.query);

    // أنيميشن دخول المحرر
    if (ui.view === 'edit') {
      var form = els.main.querySelector('.editor');
      if (form) {
        form.style.animation = 'none';
        void form.offsetWidth;
        form.style.animation = '';
      }
    }

    bindViewEvents();
    showToast();
  }

  function goToList() {
    ui.view = 'list';
    ui.editingId = null;
  }

  /* ---------- events ---------- */

  function bindViewEvents() {
    els.filters.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        ui.filter = {
          type:  btn.getAttribute('data-filter-type'),
          value: btn.getAttribute('data-filter-value')
        };
        goToList();
        render();
      });
    });

    els.main.querySelectorAll('.note-card').forEach(function (card) {
      card.addEventListener('click', function () {
        ui.view = 'edit';
        ui.editingId = card.getAttribute('data-id');
        var note = N.notes.findById(state, ui.editingId);
        ui.editingColor = note ? note.color : 'default';
        render();
      });
    });

    var form = document.getElementById('editorForm');
    if (form) bindEditorEvents(form);

    var pinBtn = document.getElementById('pinBtn');
    if (pinBtn) {
      pinBtn.addEventListener('click', function () {
        var note = N.notes.togglePin(state, ui.editingId);
        if (!note) return;
        N.notes.persist(state);
        ui.notice = note.pinned ? N.i18n.get().toast.pinned : N.i18n.get().toast.unpinned;
        render();
      });
    }

    var cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        goToList();
        render();
      });
    }

    var deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function () {
        if (!window.confirm(N.i18n.get().editor.deleteConfirm)) return;
        N.notes.deleteNote(state, ui.editingId);
        N.notes.persist(state);
        ui.notice = N.i18n.get().toast.deleted;
        goToList();
        render();
      });
    }
  }

  function bindEditorEvents(form) {
    form.querySelectorAll('.color-swatch').forEach(function (btn) {
      btn.addEventListener('click', function () {
        ui.editingColor = btn.getAttribute('data-color');
        form.querySelectorAll('.color-swatch').forEach(function (b) {
          b.classList.toggle('selected', b === btn);
        });
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = form.elements.title.value.trim();
      var body  = form.elements.body.value;
      var tags  = N.notes.parseTags(form.elements.tags.value);
      if (!title && !body.trim()) return;

      var data = { title: title, body: body, tags: tags, color: ui.editingColor };

      if (ui.editingId) N.notes.updateNote(state, ui.editingId, data);
      else              N.notes.addNote(state, data);

      N.notes.persist(state);
      ui.notice = N.i18n.get().toast.saved;
      goToList();
      render();
    });
  }

  /* ---------- toast ---------- */

  function showToast() {
    if (!ui.notice) return;
    els.toast.textContent = ui.notice;
    els.toast.classList.add('visible');
    ui.notice = null;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove('visible');
    }, cfg.toastDurationMs);
  }

  init();
})(window.Notes);
