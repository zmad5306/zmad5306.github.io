(function initThemeAndMDC() {
  var storageKey = 'theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function preferredTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {
      stored = null;
    }
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return prefersDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var next = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next === 'dark' ? 'dark' : 'light';

    if (toggle) {
      toggle.setAttribute('aria-pressed', next === 'dark');
      toggle.textContent = next === 'dark' ? 'Dark mode' : 'Light mode';
      toggle.title = next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  function setTheme(theme, persist) {
    if (persist === void 0) persist = true;
    applyTheme(theme);
    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (err) {
        /* ignore */
      }
    }
  }

  function initTheme() {
    setTheme(preferredTheme(), false);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || preferredTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  }

  prefersDark.addEventListener('change', function (event) {
    var stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {
      stored = null;
    }
    if (stored !== 'light' && stored !== 'dark') {
      setTheme(event.matches ? 'dark' : 'light', false);
    }
  });

  initTheme();

  if (window.mdc && typeof mdc.autoInit === 'function') {
    mdc.autoInit();
  }
})();
