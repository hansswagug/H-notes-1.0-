window.Notes = window.Notes || {};

window.Notes.stringsAr = {
  _dir: 'rtl',
  _title: 'ملاحظاتي',

  appTitle: 'ملاحظاتي',
  searchPlaceholder: 'ابحث في الملاحظات…',
  newNote: 'ملاحظة جديدة',
  langToggle: 'Switch to English',

  filters: {
    all: 'كل الملاحظات',
    pinned: 'المثبّتة',
    tags: 'الوسوم',
    empty: 'لا ملاحظات بعد.',
    noResults: 'لا نتائج.'
  },

  list: {
    empty: 'لا توجد ملاحظات بعد. ابدأ بإضافة ملاحظة جديدة.',
    noResults: 'لا نتائج مطابقة للبحث.',
    untitled: 'بدون عنوان',
    pinnedBadge: 'مثبّتة'
  },

  editor: {
    newTitle: 'ملاحظة جديدة',
    editTitle: 'تعديل الملاحظة',
    titlePlaceholder: 'العنوان',
    bodyPlaceholder: 'اكتب هنا…',
    tagsLabel: 'الوسوم (افصل بفاصلة)',
    tagsPlaceholder: 'عمل، شخصي، أفكار',
    colorLabel: 'اللون',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    pin: 'تثبيت',
    unpin: 'إلغاء التثبيت',
    deleteConfirm: 'هل تريد حذف هذه الملاحظة؟ لا يمكن التراجع.'
  },

  toast: {
    saved: 'تم الحفظ',
    deleted: 'تم الحذف',
    pinned: 'تم التثبيت',
    unpinned: 'تم إلغاء التثبيت'
  },

  time: {
    now: 'الآن',
    minutesAgo: function (n) { return 'قبل ' + n + ' دقيقة'; },
    hoursAgo:   function (n) { return 'قبل ' + n + ' ساعة'; },
    daysAgo:    function (n) { return 'قبل ' + n + ' يوم'; }
  }
};
