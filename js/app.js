(function () {
  'use strict';

  const pages = ['home', 'about', 'events', 'info', 'gallery', 'crew'];

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

  // Join form
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Application submitted! We'll be in touch 🎉");
      joinForm.reset();
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
        video.play().catch(e => console.log('Autoplay prevented:', e));
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

