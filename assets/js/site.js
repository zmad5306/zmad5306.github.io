/* Vanilla progressive enhancement. Everything here is optional — the site is
   fully readable and navigable with JS disabled. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ----------------------------------------------------------------------
     Theme toggle — dark default, persisted, follows OS until user chooses.
     ---------------------------------------------------------------------- */
  (function theme() {
    var storageKey = 'theme';
    var toggle = document.getElementById('theme-toggle');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function stored() {
      try {
        return localStorage.getItem(storageKey);
      } catch (err) {
        return null;
      }
    }

    function apply(theme) {
      var next = theme === 'light' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      if (toggle) {
        toggle.setAttribute('aria-pressed', String(next === 'dark'));
        toggle.title = next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        var dark = toggle.querySelector('.theme-icon-dark');
        var light = toggle.querySelector('.theme-icon-light');
        if (dark && light) {
          dark.classList.toggle('hidden', next !== 'dark');
          light.classList.toggle('hidden', next === 'dark');
        }
      }
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try {
          localStorage.setItem(storageKey, next);
        } catch (err) {
          /* ignore */
        }
      });
    }

    prefersDark.addEventListener('change', function (event) {
      var s = stored();
      if (s !== 'light' && s !== 'dark') {
        apply(event.matches ? 'dark' : 'light');
      }
    });

    apply(root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light'));
  })();

  /* ----------------------------------------------------------------------
     Sticky header condenses on scroll.
     ---------------------------------------------------------------------- */
  (function condenseHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var ticking = false;

    function update() {
      header.classList.toggle('condensed', window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  })();

  /* ----------------------------------------------------------------------
     Mobile overlay menu.
     ---------------------------------------------------------------------- */
  (function mobileMenu() {
    var button = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!button || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('hidden', !open);
      menu.classList.toggle('flex', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      button.querySelector('.menu-icon-open').classList.toggle('hidden', open);
      button.querySelector('.menu-icon-close').classList.toggle('hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    button.addEventListener('click', function () {
      setOpen(menu.classList.contains('hidden'));
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
        setOpen(false);
        button.focus();
      }
    });
  })();

  /* ----------------------------------------------------------------------
     Scroll-spy — marks the nav link of the section in view.
     ---------------------------------------------------------------------- */
  (function scrollSpy() {
    var links = document.querySelectorAll('.nav-link[data-scrollspy]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (link) {
      byId[link.getAttribute('data-scrollspy')] = link;
    });

    var sections = Object.keys(byId)
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);
    if (!sections.length) return;

    var current = null;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) current = entry.target.id;
        });
        links.forEach(function (link) {
          var active = link.getAttribute('data-scrollspy') === current;
          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  })();

  /* ----------------------------------------------------------------------
     Section reveal on scroll (skipped for reduced motion).
     ---------------------------------------------------------------------- */
  (function reveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ----------------------------------------------------------------------
     Skills filter — hides non-matching chips and empty groups.
     ---------------------------------------------------------------------- */
  (function skillsFilter() {
    var input = document.getElementById('skills-filter');
    if (!input) return;
    input.hidden = false;

    var chips = Array.prototype.slice.call(document.querySelectorAll('#skills [data-skill]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('#skills .skill-group'));
    var more = document.getElementById('skills-more');
    var empty = document.getElementById('skills-filter-empty');
    var moreWasOpen = null;

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();

      if (q && more && moreWasOpen === null) {
        moreWasOpen = more.open;
        more.open = true; /* search everything, including collapsed groups */
      } else if (!q && more && moreWasOpen !== null) {
        more.open = moreWasOpen;
        moreWasOpen = null;
      }

      var any = false;
      chips.forEach(function (chip) {
        var match = !q || chip.getAttribute('data-skill').indexOf(q) !== -1;
        chip.classList.toggle('hidden', !match);
        if (match) any = true;
      });

      groups.forEach(function (group) {
        var visible = group.querySelector('[data-skill]:not(.hidden)');
        group.classList.toggle('hidden', !visible);
      });

      if (empty) empty.hidden = !q || any;
    });
  })();

  /* ----------------------------------------------------------------------
     Blog index tag filter.
     ---------------------------------------------------------------------- */
  (function tagFilter() {
    var bar = document.getElementById('tag-filter');
    var list = document.getElementById('post-list');
    if (!bar || !list) return;
    bar.hidden = false;

    var buttons = Array.prototype.slice.call(bar.querySelectorAll('.tag-filter-btn'));
    var cards = Array.prototype.slice.call(list.querySelectorAll('.post-card'));

    bar.addEventListener('click', function (event) {
      var button = event.target.closest('.tag-filter-btn');
      if (!button) return;
      var tag = button.getAttribute('data-tag');

      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === button));
      });

      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        card.classList.toggle('hidden', Boolean(tag) && tags.indexOf(tag) === -1);
      });
    });
  })();

  /* ----------------------------------------------------------------------
     Copy buttons on code blocks.
     ---------------------------------------------------------------------- */
  (function copyButtons() {
    if (!navigator.clipboard) return;
    var blocks = document.querySelectorAll('.post-body div.highlighter-rouge');

    var copyIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

    blocks.forEach(function (block) {
      var code = block.querySelector('pre code, pre');
      if (!code) return;

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy';
      button.innerHTML = copyIcon + '<span>copy</span>';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', function () {
        navigator.clipboard.writeText(code.innerText).then(function () {
          button.classList.add('copied');
          button.querySelector('span').textContent = 'copied';
          window.setTimeout(function () {
            button.classList.remove('copied');
            button.querySelector('span').textContent = 'copy';
          }, 1600);
        });
      });

      block.appendChild(button);
    });
  })();

  /* ----------------------------------------------------------------------
     Open all collapsed sections when printing so nothing is cut from the
     printed résumé/article; restore afterwards.
     ---------------------------------------------------------------------- */
  (function printExpand() {
    var touched = [];

    window.addEventListener('beforeprint', function () {
      touched = [];
      document.querySelectorAll('details:not([open])').forEach(function (d) {
        d.open = true;
        touched.push(d);
      });
    });

    window.addEventListener('afterprint', function () {
      touched.forEach(function (d) {
        d.open = false;
      });
      touched = [];
    });
  })();
})();
