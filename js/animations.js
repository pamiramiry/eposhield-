/* ─── EpoShield — Intersection Observer Animations ───────────────────────────
   Triggers CSS transitions on .fade-up, .fade-in, .stagger elements
   Falls back gracefully if IntersectionObserver is unavailable.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var targets = document.querySelectorAll('.fade-up, .fade-in, .stagger');

  if (!targets.length) return;

  /* Fallback for old browsers: show everything immediately */
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -32px 0px'
  });

  targets.forEach(function (el) { observer.observe(el); });
})();
