/* ─── EpoShield — Navigation ─────────────────────────────────────────────────
   Handles: sticky scroll state, mobile menu toggle, close on link click
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var nav    = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var mobile = document.querySelector('.nav__mobile');

  if (!nav) return;

  /* Sticky scroll shadow */
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Dropdown aria-expanded for keyboard users */
  document.querySelectorAll('.nav__dropdown-trigger').forEach(function (btn) {
    var dropdown = btn.closest('.nav__dropdown');
    dropdown.addEventListener('focusin', function () {
      btn.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('focusout', function (e) {
      if (!dropdown.contains(e.relatedTarget)) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Mobile menu */
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      mobile.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    /* Close menu when any link inside is clicked */
    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobile.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobile.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }
})();
