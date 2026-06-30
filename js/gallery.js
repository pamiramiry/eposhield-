/* ─── EpoShield — Gallery Filter + Lightbox ──────────────────────────────────
   Filter tabs by data-category. Lightbox for enlarged image view.
   No libraries. Keyboard accessible. Closes on Escape or backdrop click.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Filter ── */
  var filters  = document.querySelectorAll('.gallery-filter');
  var items    = document.querySelectorAll('.gallery-item[data-category]');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      var filter = btn.dataset.filter;

      items.forEach(function (item) {
        var show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
        item.setAttribute('aria-hidden', !show);
      });
    });
  });

  /* ── Lightbox ── */
  var lightbox     = document.querySelector('.lightbox');
  var lightboxImg  = lightbox && lightbox.querySelector('img');
  var closeBtn     = lightbox && lightbox.querySelector('.lightbox__close');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Return focus to the item that opened the lightbox */
    if (lastOpener) lastOpener.focus();
  }

  var lastOpener = null;

  items.forEach(function (item) {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    function activate() {
      var img = item.querySelector('img');
      if (!img) return;
      lastOpener = item;
      openLightbox(img.src, img.alt);
    }

    item.addEventListener('click', activate);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
