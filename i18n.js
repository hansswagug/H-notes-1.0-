window.Notes = window.Notes || {};

(function (N) {
  var cfg = N.config;
  var registry = { en: N.stringsEn, ar: N.stringsAr };

  var current = (function () {
    var saved = N.storage.loadLang();
    if (saved && cfg.supportedLangs.indexOf(saved) !== -1) return saved;
    return cfg.defaultLang;
  })();

  function get() {
    return registry[current];
  }

  function getLang() {
    return current;
  }

  function setLang(lang) {
    if (cfg.supportedLangs.indexOf(lang) === -1) return false;
    current = lang;
    N.storage.saveLang(lang);
    applyDocument();
    return true;
  }

  function toggle() {
    setLang(current === 'en' ? 'ar' : 'en');
  }

  function applyDocument() {
    var s = get();
    document.documentElement.lang = current;
    document.documentElement.dir  = s._dir;
    document.title = s._title;
  }

  N.i18n = {
    get: get,
    getLang: getLang,
    setLang: setLang,
    toggle: toggle,
    applyDocument: applyDocument
  };
})(window.Notes);
