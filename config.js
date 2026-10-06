window.Notes = window.Notes || {};

window.Notes.config = {
  storageKey: 'notes_app_v2',
  langKey: 'notes_app_lang',

  defaultLang: 'en',
  supportedLangs: ['en', 'ar'],

  titleMaxLength: 120,
  bodyMaxLength: 20000,
  previewLength: 120,
  toastDurationMs: 2200,

  // ألوان الملاحظات (باستيل هادئة للستايل الزجاجي)
  colors: {
    default: { en: 'Default', ar: 'افتراضي', hex: 'rgba(255,255,255,0.55)' },
    mint:    { en: 'Mint',    ar: 'نعناعي', hex: 'rgba(190,240,220,0.55)' },
    sky:     { en: 'Sky',     ar: 'سماوي',  hex: 'rgba(190,220,250,0.55)' },
    lilac:   { en: 'Lilac',   ar: 'بنفسجي', hex: 'rgba(220,205,250,0.55)' },
    rose:    { en: 'Rose',    ar: 'وردي',   hex: 'rgba(250,205,220,0.55)' },
    sand:    { en: 'Sand',    ar: 'رملي',   hex: 'rgba(245,225,190,0.55)' }
  }
};
