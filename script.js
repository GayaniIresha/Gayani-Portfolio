
const EMAIL_CONFIG = {
  serviceId: 'service_zruidpy',
  templateId: 'template_wr18r7p',
  publicKey: 'HrA1dgnBzRfFgGdhM',
};

const RATE_LIMIT_MS = 30000;
const FORM_STATE_KEY = '6LcvNO8tAAAAABMqDFYYSV2wO7DdTjR4pjcuC_6a';

function setStatus(message, type = '') {
  const statusBox = document.getElementById('formStatus');
  if (!statusBox) return;

  statusBox.textContent = message;
  statusBox.classList.remove('success', 'error');

  if (type) {
    statusBox.classList.add(type);
  }
}

function setFieldError(input, message) {
  const errorNode =
    input.parentElement?.querySelector('.field-error');

  input.setAttribute('aria-invalid', message ? 'true' : 'false');

  if (errorNode) {
    errorNode.textContent = message || '';
  }
}

function validateField(input) {
  const name = input.name;
  const value = input.value.trim();

  if (name === 'website' && value) {
    return false;
  }

  if (!value) {
    setFieldError(input, 'This field is required.');
    return false;
  }

  if (name === 'email') {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!validEmail) {
      setFieldError(input, 'Please enter a valid email address.');
      return false;
    }
  }

  if (name === 'name' && value.length < 2) {
    setFieldError(input, 'Please enter at least 2 characters.');
    return false;
  }

  if (name === 'subject' && value.length < 3) {
    setFieldError(
      input,
      'Please enter a subject with at least 3 characters.'
    );
    return false;
  }

  if (name === 'message' && value.length < 10) {
    setFieldError(
      input,
      'Please write a message with at least 10 characters.'
    );
    return false;
  }

  setFieldError(input, '');
  return true;
}

function validateForm(form) {
  const fieldNames = ['name', 'email', 'subject', 'message'];
  let isValid = true;

  fieldNames.forEach((fieldName) => {
    const field = form.elements.namedItem(fieldName);

    if (!field) {
      isValid = false;
      return;
    }

    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function isEmailConfigReady() {
  return Object.values(EMAIL_CONFIG).every((value) => {
    return (
      typeof value === 'string' &&
      value.trim().length > 0 &&
      !value.includes('YOUR_')
    );
  });
}

function canSendMessage() {
  try {
    const lastStamp = Number(
      sessionStorage.getItem(FORM_STATE_KEY) || '0'
    );

    return Date.now() - lastStamp >= RATE_LIMIT_MS;
  } catch {
    return true;
  }
}

function markMessageSent() {
  try {
    sessionStorage.setItem(FORM_STATE_KEY, String(Date.now()));
  } catch {
    // Sending should not fail if sessionStorage is unavailable.
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year.
  const yearNode = document.getElementById('year');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  // Mobile navigation.
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form.
  const form = document.getElementById('contactForm');

  if (!form) return;

  const fields = form.querySelectorAll('input, textarea');

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      validateField(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const honeypot = form.elements.namedItem('website');

    if (honeypot && honeypot.value.trim()) {
      setStatus('Your message could not be sent.', 'error');
      return;
    }

    if (!validateForm(form)) {
      setStatus(
        'Please correct the highlighted fields and try again.',
        'error'
      );
      return;
    }

    // Check Google reCAPTCHA.
    if (!window.grecaptcha?.getResponse) {
      setStatus(
        'reCAPTCHA is still loading. Please refresh and try again.',
        'error'
      );
      return;
    }

    const captchaResponse = window.grecaptcha.getResponse();

    if (!captchaResponse) {
      setStatus(
        'Please complete the reCAPTCHA verification.',
        'error'
      );
      return;
    }

    if (!canSendMessage()) {
      setStatus(
        'Please wait 30 seconds before sending another message.',
        'error'
      );
      return;
    }

    const submitButton = form.querySelector('#submitBtn');

    if (!submitButton) return;

    if (!isEmailConfigReady()) {
      setStatus(
        'Please add your EmailJS Public Key in script.js first.',
        'error'
      );
      return;
    }

    if (!window.emailjs?.send) {
      setStatus(
        'EmailJS is still loading. Please try again shortly.',
        'error'
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    setStatus('Sending your message...');

    try {
      const payload = {
        from_name: form.elements.namedItem('name').value.trim(),
        from_email: form.elements.namedItem('email').value.trim(),
        subject: form.elements.namedItem('subject').value.trim(),
        message: form.elements.namedItem('message').value.trim(),
        recipient_email: 'gayani02iresha@gmail.com',
        'g-recaptcha-response': captchaResponse
      };

      await window.emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        payload,
        { publicKey: EMAIL_CONFIG.publicKey }
      );

      markMessageSent();
      form.reset();

      if (window.grecaptcha?.reset) {
        window.grecaptcha.reset();
      }

      fields.forEach((field) => {
        setFieldError(field, '');
      });

      setStatus(
        'Your message was sent successfully. Thank you for reaching out!',
        'success'
      );
    } catch (error) {
      console.error('Email delivery failed:', error);

      if (window.grecaptcha?.reset) {
        window.grecaptcha.reset();
      }

      setStatus(
        'Your message could not be sent. Please try again or email gayani02iresha@gmail.com directly.',
        'error'
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});
