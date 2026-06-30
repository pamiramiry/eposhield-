/* ─── EpoShield — UI Utilities ────────────────────────────────────────────────
   Handles: scroll progress bar, back-to-top button
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Scroll progress bar ── */
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ── Back-to-top button ── */
  var btn = document.querySelector('.back-to-top');
  if (btn) {
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();
