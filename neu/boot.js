// Hell/Dunkel vor dem ersten Zeichnen setzen (eigene Datei statt Inline-Skript, wegen der Content-Security-Policy)
(function () {
  try {
    var s = localStorage.getItem('neu_theme');
    var t = (s === 'light' || s === 'dark') ? s : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) { /* ohne Speicher: Standard */ }
})();
