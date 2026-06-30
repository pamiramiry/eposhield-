/* ─── EpoShield — Before / After Slider ──────────────────────────────────────
   Drag or touch to reveal comparison. Uses clip-path on the before layer.
   Replace .ph divs with <img> elements when real photos are ready.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var slider = document.querySelector('.before-after');
  if (!slider) return;

  var before  = slider.querySelector('.before-after__before');
  var handle  = slider.querySelector('.before-after__handle');
  var isDragging = false;
  var pct = 50;

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function setPosition(clientX) {
    var rect = slider.getBoundingClientRect();
    pct = clamp(((clientX - rect.left) / rect.width) * 100, 4, 96);
    before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    handle.style.left     = pct + '%';
  }

  /* Mouse */
  slider.addEventListener('mousedown', function (e) {
    isDragging = true;
    setPosition(e.clientX);
    e.preventDefault();
  });
  window.addEventListener('mousemove', function (e) {
    if (isDragging) setPosition(e.clientX);
  });
  window.addEventListener('mouseup', function () {
    isDragging = false;
  });

  /* Touch */
  slider.addEventListener('touchstart', function (e) {
    isDragging = true;
    setPosition(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (isDragging) setPosition(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', function () {
    isDragging = false;
  });
})();
