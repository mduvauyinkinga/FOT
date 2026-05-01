(function () {
  'use strict';

const pages = ['home', 'about', 'events', 'info', 'gallery', 'crew', 'privacy-policy', 'terms'];

  // Router
  function navigate() {
    const hash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
    const target = pages.includes(hash) ? hash : 'not-found';

    document.querySelectorAll('.page').forEach((el) => el.classList.remove('active'));
    const active = document.getElementById('page-' + target);
    if (active) active.classList.add('active');

    // Update nav active states
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((a) => {
      const href = a.getAttribute('href');
      const page = href ? href.replace('#/', '') : '';
      if (page === target || (target === 'home' && page === '')) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });

    // Close mobile menu on nav
    document.querySelector('.mobile-menu').classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', navigate);

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Toast helper
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // RSVP toggles
  const rsvpState = new Set();
  document.querySelectorAll('.rsvp-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      if (rsvpState.has(id)) {
        rsvpState.delete(id);
        btn.textContent = 'RSVP Now';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      } else {
        rsvpState.add(id);
        btn.textContent = "✓ RSVP'd";
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });
  });

// Form validation functions
  function validateName(value) {
    if (!value.trim()) {
      return 'Name is required';
    }
    if (value.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  }

  function validateEmail(value) {
    if (!value.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  function validateMessage(value) {
    if (!value.trim()) {
      return 'Message is required';
    }
    if (value.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    return '';
  }

  function setFieldState(input, error) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const errorEl = formGroup.querySelector('.error-message');
    
    if (error) {
      formGroup.classList.add('has-error');
      input.classList.add('error');
      input.classList.remove('valid');
      if (errorEl) errorEl.textContent = error;
    } else {
      formGroup.classList.remove('has-error');
      input.classList.remove('error');
      input.classList.add('valid');
      if (errorEl) errorEl.textContent = '';
    }
  }

  // Validation on blur
  function handleBlur(e) {
    const input = e.target;
    const value = input.value;
    let error = '';

    if (input.id === 'name') {
      error = validateName(value);
    } else if (input.id === 'email') {
      error = validateEmail(value);
    } else if (input.id === 'message') {
      error = validateMessage(value);
    }

    setFieldState(input, error);
  }

  // Validate entire form
  function validateForm(form) {
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const messageError = validateMessage(messageInput.value);

    setFieldState(nameInput, nameError);
    setFieldState(emailInput, emailError);
    setFieldState(messageInput, messageError);

    return !nameError && !emailError && !messageError;
  }

// Join form - Send to Formspree
  const joinForm = document.getElementById('join-form');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');

  if (joinForm) {
    // Add blur validation
    const nameInput = joinForm.querySelector('#name');
    const emailInput = joinForm.querySelector('#email');
    const messageInput = joinForm.querySelector('#message');
    // Honeypot field for spam detection
    const honeypotInput = joinForm.querySelector('#website');

    if (nameInput) nameInput.addEventListener('blur', handleBlur);
    if (emailInput) emailInput.addEventListener('blur', handleBlur);
    if (messageInput) messageInput.addEventListener('blur', handleBlur);

    joinForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check honeypot field - if filled, it's a bot
      if (honeypotInput && honeypotInput.value.trim() !== '') {
        // Silently reject - show success but don't actually submit
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.className = 'form-message success';
          formMessage.textContent = "Thanks, we've received your feedback.";
        }
        joinForm.reset();
        setTimeout(() => {
          if (formMessage) formMessage.style.display = 'none';
        }, 5000);
        return;
      }

      // Validate before submitting
      if (!validateForm(joinForm)) {
        return;
      }
      
      // Disable button and show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      
      // Collect form data
      const formData = new FormData(joinForm);
      
      try {
        const response = await fetch('https://formspree.io/f/xjglkgay', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Show success message
          if (formMessage) {
            formMessage.style.display = 'block';
            formMessage.className = 'form-message success';
            formMessage.textContent = "Thanks, we've received your feedback.";
          }
          joinForm.reset();
          
          // Clear validation states
          [nameInput, emailInput, messageInput].forEach(input => {
            if (input) {
              input.classList.remove('valid', 'error');
              const formGroup = input.closest('.form-group');
              if (formGroup) formGroup.classList.remove('has-error');
            }
          });
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Show error message
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.className = 'form-message error';
          formMessage.textContent = 'Something went wrong. Please try again.';
        }
      }
      
      // Re-enable button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
      }
      
      // Hide message after 5 seconds
      if (formMessage) {
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
    });
  }

  // Gallery filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach((item) => {
        if (filter === 'All' || item.dataset.category === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxMedia = document.getElementById('lightbox-media');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.dataset.title;
      const category = item.dataset.category;
      const gradient = item.dataset.gradient;
      const videoSrc = item.dataset.video;

      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxTag) lightboxTag.textContent = category;

      // Clear previous content
      lightboxMedia.innerHTML = `
        <div>
          <span class="tag" id="lightbox-tag"></span>
          <h2 id="lightbox-title"></h2>
        </div>
      `;

      if (videoSrc && lightboxMedia) {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.poster = 'assets/BTS/Thumbnail-Freshers.png';
        video.controls = true;
        video.muted = true;
        video.autoplay = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.borderRadius = '1rem';
        lightboxMedia.appendChild(video);
        video.play().catch(() => {});
      } else if (lightboxMedia && gradient) {
        lightboxMedia.style.background = gradient;
      }

      if (lightbox) lightbox.classList.add('open');
    });
  });

  const lightboxClose = document.getElementById('lightbox-close');
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }
})();

