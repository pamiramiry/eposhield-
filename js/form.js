/* ─── EpoShield — Form Validation ────────────────────────────────────────────
   Real-time inline validation for the quote request form.
   Validates on blur and corrects on input so errors clear as the user types.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var form = document.querySelector('.quote-form');
  if (!form) return;

  /* ── Validators ── */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }
  function isValidPhone(v) {
    return /[\d\s\(\)\-\+]{7,}/.test(v.trim());
  }
  function isEmpty(v) {
    return v.trim().length === 0;
  }

  /* ── Show / clear error on a field ── */
  function setError(input, msg) {
    var wrapper = input.closest('.form-group') || input.parentElement;
    var errEl   = wrapper.querySelector('.form-error');
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('is-error');
    input.classList.remove('is-valid');
    if (errEl) {
      errEl.textContent = msg;
      errEl.style.display = 'block';
    }
  }
  function clearError(input) {
    var wrapper = input.closest('.form-group') || input.parentElement;
    var errEl   = wrapper.querySelector('.form-error');
    input.removeAttribute('aria-invalid');
    input.classList.remove('is-error');
    input.classList.add('is-valid');
    if (errEl) {
      errEl.style.display = 'none';
    }
  }

  /* ── Validate a single field ── */
  function validateField(input) {
    var id  = input.id;
    var val = input.value;

    if (id === 'name') {
      if (isEmpty(val)) { setError(input, 'Please enter your full name.'); return false; }
      if (val.trim().length < 2) { setError(input, 'Name must be at least 2 characters.'); return false; }
    }
    if (id === 'phone') {
      if (isEmpty(val)) { setError(input, 'Please enter your phone number.'); return false; }
      if (!isValidPhone(val)) { setError(input, 'Please enter a valid phone number.'); return false; }
    }
    if (id === 'email') {
      if (isEmpty(val)) { setError(input, 'Please enter your email address.'); return false; }
      if (!isValidEmail(val)) { setError(input, 'Please enter a valid email (e.g. name@example.com).'); return false; }
    }
    if (id === 'details') {
      if (isEmpty(val)) { setError(input, 'Please describe your project.'); return false; }
      if (val.trim().length < 10) { setError(input, 'Please provide a bit more detail.'); return false; }
    }

    clearError(input);
    return true;
  }

  /* ── Bind blur (validate) and input (clear if now valid) ── */
  var required = form.querySelectorAll('[required]');
  required.forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });
    field.addEventListener('input', function () {
      if (field.classList.contains('is-error')) {
        validateField(field);
      }
    });
  });

  /* ── On submit: validate all required fields before proceeding ── */
  form.addEventListener('submit', function (e) {
    var allValid = true;
    required.forEach(function (field) {
      if (!validateField(field)) {
        allValid = false;
      }
    });
    if (!allValid) {
      e.preventDefault();
      var firstError = form.querySelector('.is-error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
})();
