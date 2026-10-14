const EMAIL_CONFIG = {
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
};

const RATE_LIMIT_MS = 30000;
const FORM_STATE_KEY = 'portfolio-contact-rate-limit';

function setStatus(message, type) {
  const statusBox = document.getElementById('formStatus');
  if (!statusBox) return;

  statusBox.textContent = message;
  statusBox.classList.remove('success', 'error');
  if (type) statusBox.classList.add(type);
}

function setFieldError(input, message) {
  const errorNode = input.parentElement.querySelector('.field-error');
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
    setFieldError(input, 'Please enter a subject with at least 3 characters.');
    return false;
  }

  if (name === 'message' && value.length < 10) {
    setFieldError(input, 'Please write a message with at least 10 characters.');
    return false;
  }

  setFieldError(input, '');
  return true;
}

function validateForm(form) {
  const fields = ['name', 'email', 'subject', 'message'];
  let isValid = true;

  fields.forEach((fieldName) => {
    const field = form.elements[fieldName];
    if (!field) return;

    const ok = validateField(field);
    if (!ok) isValid = false;
  });

  return isValid;
}

function isEmailConfigReady() {
  return Object.values(EMAIL_CONFIG).every((value) => {
    if (typeof value !== 'string') return false;
    return value.trim().length > 0 && !value.includes('YOUR_');
  });
}

function canSendMessage() {
  const lastStamp = Number(window.sessionStorage.getItem(FORM_STATE_KEY) || '0');
  return Date.now() - lastStamp >= RATE_LIMIT_MS;
}

function markMessageSent() {
  window.sessionStorage.setItem(FORM_STATE_KEY, String(Date.now()));
}

document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

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
    const honeypot = form.elements.website;
    if (honeypot && honeypot.value.trim()) {
      setStatus('Your message could not be sent.', 'error');
      return;
    }

    if (!validateForm(form)) {
      setStatus('Please correct the highlighted fields and try again.', 'error');
      return;
    }

    if (!canSendMessage()) {
      setStatus('Please wait a moment before sending another message.', 'error');
      return;
    }

    const submitButton = form.querySelector('#submitBtn');
    if (!submitButton) return;

    if (!isEmailConfigReady()) {
      submitButton.disabled = false;
      setStatus(
        'The contact form is configured, but EmailJS credentials are still placeholders. Follow the setup steps in the README and replace the values in script.js before sending actual emails.',
        'error'
      );
      return;
    }

    if (!window.emailjs || !window.emailjs.send) {
      setStatus('The email service library is still loading. Please try again in a moment.', 'error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    setStatus('Sending your message...', '');

    try {
      const payload = {
        from_name: form.elements.name.value.trim(),
        from_email: form.elements.email.value.trim(),
        subject: form.elements.subject.value.trim(),
        message: form.elements.message.value.trim(),
        recipient_email: 'gayani02iresha@gmail.com'
      };

      await window.emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        payload,
        { publicKey: EMAIL_CONFIG.publicKey }
      );

      markMessageSent();
      form.reset();
      setStatus('Your message was sent successfully. Thank you for reaching out!', 'success');
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    } catch (error) {
      console.error('Email delivery failed:', error);
      setStatus('Your message could not be sent at the moment. Please try again or email me directly at gayani02iresha@gmail.com.', 'error');
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }
  });
});
