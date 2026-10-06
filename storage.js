window.Notes = window.Notes || {};

(function (N) {
  var KEY = N.config.storageKey;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)); }
    catch (e) { return null; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { /* ignore */ }
  }
  function clear() {
    try { localStorage.removeItem(KEY); }
    catch (e) { /* ignore */ }
  }

  function loadLang() {
    try { return localStorage.getItem(N.config.langKey); }
    catch (e) { return null; }
  }
  function saveLang(lang) {
    try { localStorage.setItem(N.config.langKey, lang); }
    catch (e) { /* ignore */ }
  }

  N.storage = {
    load: load, save: save, clear: clear,
    loadLang: loadLang, saveLang: saveLang
  };
})(window.Notes);
