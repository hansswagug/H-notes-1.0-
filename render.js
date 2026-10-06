window.Notes = window.Notes || {};

(function (N) {
  var cfg = N.config;
  var I   = N.icons;

  function S() { return N.i18n.get(); }

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function timeAgo(ts) {
    var t = S().time;
    var diff = Date.now() - ts;
    var m = Math.floor(diff / 60000);
    if (m < 1)  return t.now;
    if (m < 60) return t.minutesAgo(m);
    var h = Math.floor(m / 60);
    if (h < 24) return t.hoursAgo(h);
    return t.daysAgo(Math.floor(h / 24));
  }

  function preview(text, len) {
    var t = String(text || '').replace(/\s+/g, ' ').trim();
    return t.length <= len ? t : t.slice(0, len) + '…';
  }

  function localColor(key) {
    var lang = N.i18n.getLang();
    var c = cfg.colors[key] || cfg.colors.default;
    return c[lang] || c.en;
  }

  function filterItem(type, value, label, count, active) {
    var isActive = active.type === type && active.value === value;
    return '<li><button class="filter-btn' + (isActive ? ' active' : '') + '"'
      + ' data-filter-type="' + esc(type) + '"'
      + ' data-filter-value="' + esc(value) + '">'
      + '<span class="filter-label">' + esc(label) + '</span>'
      + '<span class="filter-count">' + count + '</span>'
      + '</button></li>';
  }

  function renderFilters(state, active) {
    var s = S();
    var total  = state.notes.length;
    var pinned = state.notes.filter(function (n) { return n.pinned; }).length;
    var tags   = N.notes.allTags(state);
    var h = [];

    h.push('<ul class="filter-list">');
    h.push(filterItem('all', '', s.filters.all, total, active));
    h.push(filterItem('pinned', '', s.filters.pinned, pinned, active));

    if (tags.length) {
      h.push('<li class="filter-section">'
        + '<span class="filter-section-icon">' + I.tag(14) + '</span>'
        + esc(s.filters.tags)
        + '</li>');
      tags.forEach(function (t) {
        h.push(filterItem('tag', t.name, t.name, t.count, active));
      });
    }
    h.push('</ul>');
    return h.join('');
  }

  function renderCard(n, index) {
    var color = cfg.colors[n.color] || cfg.colors.default;
    var style = 'background:' + color.hex + ';'
              + 'animation-delay:' + Math.min(index * 35, 350) + 'ms;';

    var titleHtml = n.title
      ? esc(n.title)
      : '<em class="untitled">' + esc(S().list.untitled) + '</em>';
    var body = preview(n.body, cfg.previewLength);

    var h = [];
    h.push('<article class="note-card glass' + (n.pinned ? ' pinned' : '') + '"'
      + ' data-id="' + esc(n.id) + '"'
      + ' style="' + style + '">');

    if (n.pinned) {
      h.push('<div class="pin-badge" title="' + esc(S().list.pinnedBadge) + '">'
        + I.pinFilled(14) + '</div>');
    }

    h.push('<h3 class="note-title">' + titleHtml + '</h3>');
    if (body) h.push('<p class="note-preview">' + esc(body) + '</p>');

    if (n.tags.length) {
      h.push('<div class="note-tags">');
      n.tags.forEach(function (t) { h.push('<span class="tag">' + esc(t) + '</span>'); });
      h.push('</div>');
    }

    h.push('<div class="note-meta">' + esc(timeAgo(n.updatedAt)) + '</div>');
    h.push('</article>');
    return h.join('');
  }

  function renderList(state, filter, query) {
    var s = S();
    if (state.notes.length === 0) {
      return '<div class="empty glass">' + esc(s.list.empty) + '</div>';
    }
    var notes = N.notes.filterNotes(state, filter, query);
    if (notes.length === 0) {
      return '<div class="empty glass">' + esc(s.list.noResults) + '</div>';
    }
    return '<div class="notes-grid">'
      + notes.map(function (n, i) { return renderCard(n, i); }).join('')
      + '</div>';
  }

  function renderEditor(state, id) {
    var s = S();
    var note  = id ? N.notes.findById(state, id) : null;
    var isNew = !note;

    var title  = note ? note.title : '';
    var body   = note ? note.body : '';
    var tags   = note ? note.tags.join(', ') : '';
    var color  = note ? note.color : 'default';
    var pinned = note ? note.pinned : false;

    var h = [];
    h.push('<form class="editor glass" id="editorForm"'
      + (note ? ' data-id="' + esc(note.id) + '"' : '') + '>');

    h.push('<div class="editor-header">');
    h.push('<h2>' + esc(isNew ? s.editor.newTitle : s.editor.editTitle) + '</h2>');
    if (!isNew) {
      h.push('<button type="button" class="btn-icon" id="pinBtn"'
        + ' title="' + esc(pinned ? s.editor.unpin : s.editor.pin) + '"'
        + ' aria-label="' + esc(pinned ? s.editor.unpin : s.editor.pin) + '">'
        + (pinned ? I.pinFilled(18) : I.pinOutline(18)) + '</button>');
    }
    h.push('</div>');

    h.push('<label class="field">');
    h.push('<input type="text" name="title" class="input-title"'
      + ' maxlength="' + cfg.titleMaxLength + '"'
      + ' placeholder="' + esc(s.editor.titlePlaceholder) + '"'
      + ' value="' + esc(title) + '">');
    h.push('</label>');

    h.push('<label class="field">');
    h.push('<textarea name="body" class="input-body"'
      + ' maxlength="' + cfg.bodyMaxLength + '"'
      + ' placeholder="' + esc(s.editor.bodyPlaceholder) + '">'
      + esc(body) + '</textarea>');
    h.push('</label>');

    h.push('<label class="field">');
    h.push('<span class="field-label">' + esc(s.editor.tagsLabel) + '</span>');
    h.push('<input type="text" name="tags" class="input-tags"'
      + ' placeholder="' + esc(s.editor.tagsPlaceholder) + '"'
      + ' value="' + esc(tags) + '">');
    h.push('</label>');

    h.push('<div class="field">');
    h.push('<span class="field-label">' + esc(s.editor.colorLabel) + '</span>');
    h.push('<div class="color-picker">');
    Object.keys(cfg.colors).forEach(function (key) {
      var c = cfg.colors[key];
      h.push('<button type="button" class="color-swatch'
        + (color === key ? ' selected' : '') + '"'
        + ' data-color="' + esc(key) + '"'
        + ' title="' + esc(c[N.i18n.getLang()] || c.en) + '"'
        + ' aria-label="' + esc(c[N.i18n.getLang()] || c.en) + '"'
        + ' style="background:' + c.hex + '"></button>');
    });
    h.push('</div></div>');

    h.push('<div class="editor-actions">');
    h.push('<button type="submit" class="btn-primary">'
      + '<span class="btn-ico">' + I.check(16) + '</span>'
      + esc(s.editor.save) + '</button>');
    h.push('<button type="button" class="btn-secondary" id="cancelBtn">'
      + '<span class="btn-ico">' + I.x(16) + '</span>'
      + esc(s.editor.cancel) + '</button>');
    if (!isNew) {
      h.push('<button type="button" class="btn-danger" id="deleteBtn">'
        + '<span class="btn-ico">' + I.trash(16) + '</span>'
        + esc(s.editor.delete) + '</button>');
    }
    h.push('</div>');

    h.push('</form>');
    return h.join('');
  }

  N.render = {
    esc: esc, timeAgo: timeAgo, preview: preview,
    localColor: localColor,
    renderFilters: renderFilters,
    renderList: renderList,
    renderEditor: renderEditor
  };
})(window.Notes);
