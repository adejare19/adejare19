/*
  Private School Website Template
  File: script.js
  Structure: Mobile navigation toggle, dynamic footer year, and basic frontend form validation.
*/

(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      siteNav.classList.toggle('is-open');
    });

    siteNav.addEventListener('click', (event) => {
      if (event.target.matches('.nav-list__link') && window.innerWidth < 720) {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      }
    });
  }

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const forms = document.querySelectorAll('form[data-validate]');

  function getCustomErrorMessage(input) {
    if (input.validity.valueMissing) {
      return 'This field is required.';
    }

    if (input.validity.typeMismatch) {
      if (input.type === 'email') return 'Please enter a valid email address.';
      return 'Please enter a valid value.';
    }

    if (input.validity.patternMismatch) {
      return 'Please enter a valid format.';
    }

    if (input.validity.tooShort) {
      return `Please enter at least ${input.minLength} characters.`;
    }

    return '';
  }

  function validateField(input) {
    const errorElement = input.parentElement.querySelector('.form-error');
    if (!errorElement) return true;

    const message = getCustomErrorMessage(input);
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');

    return !message;
  }

  forms.forEach((form) => {
    const statusElement = form.querySelector('.form-status');
    const fields = form.querySelectorAll('input, textarea, select');

    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;

      fields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (!statusElement) return;

      if (isValid) {
        statusElement.textContent = 'Form submitted successfully. Our team will contact you shortly.';
        form.reset();
        fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
      } else {
        statusElement.textContent = 'Please correct highlighted errors before submitting.';
      }
    });
  });
})();
