/* ============================================================
   BODYLIFE FITNESS HUB — PREMIUM JS v2.0
   Smooth · Animated · Professional · Interactive
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   1. DOM READY
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initScrollProgress();
  initActiveNavLinks();
  initHeroParallax();
  initCounterAnimations();
  initMobileMenu();
  initGalleryLightbox();
  initBMICalculator();
  initGymTimings();
  initContactForm();
  initScrollReveal();
  initCursorGlow();
  initTypingEffect();
  initPricingHover();
  initSmoothScroll();
  initLazyImages();
  initStatsObserver();
});

/* ══════════════════════════════════════════
   2. AOS INIT
══════════════════════════════════════════ */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
    });
  }
}

/* ══════════════════════════════════════════
   3. NAVBAR — SCROLL BEHAVIOR
══════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScroll > 300) {
          if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
          } else {
            navbar.style.transform = 'translateY(0)';
          }
        } else {
          navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════
   4. SCROLL PROGRESS BAR
══════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });
}

/* ══════════════════════════════════════════
   5. ACTIVE NAV LINKS (INTERSECTION)
══════════════════════════════════════════ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .navbar-mobile-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════
   6. HERO PARALLAX
══════════════════════════════════════════ */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.06) translateY(${scrollY * 0.28}px)`;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════
   7. COUNTER ANIMATIONS
══════════════════════════════════════════ */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    const suffix = el.dataset.suffix || '+';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + (progress === 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ══════════════════════════════════════════
   8. MOBILE MENU
══════════════════════════════════════════ */
function initMobileMenu() {
  const toggle   = document.getElementById('navbarToggle');
  const menu     = document.getElementById('navbarMobileMenu');
  const backdrop = document.getElementById('navbarBackdrop');
  const links    = document.querySelectorAll('.navbar-mobile-link, .navbar-mobile-cta');
  if (!toggle || !menu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    menu.classList.add('open');
    backdrop && backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Animate hamburger to X
    const lines = toggle.querySelectorAll('.hamburger-line');
    if (lines[0]) { lines[0].style.transform = 'rotate(45deg) translate(5px,5px)'; }
    if (lines[1]) { lines[1].style.opacity = '0'; lines[1].style.transform = 'scaleX(0)'; }
    if (lines[2]) { lines[2].style.transform = 'rotate(-45deg) translate(5px,-5px)'; }
  }

  function closeMenu() {
    isOpen = false;
    menu.classList.remove('open');
    backdrop && backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    const lines = toggle.querySelectorAll('.hamburger-line');
    lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
  }

  toggle.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
  backdrop && backdrop.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

/* ══════════════════════════════════════════
   9. SMOOTH SCROLL
══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════
   10. GALLERY LIGHTBOX
══════════════════════════════════════════ */
function initGalleryLightbox() {
  const lightbox  = document.getElementById('galleryLightbox');
  const lbImage   = document.getElementById('lightboxImage');
  const lbCaption = document.getElementById('lightboxCaption');
  const closeBtn  = lightbox?.querySelector('.lightbox-close');
  const prevBtn   = lightbox?.querySelector('.lightbox-prev');
  const nextBtn   = lightbox?.querySelector('.lightbox-next');
  const items     = Array.from(document.querySelectorAll('.gallery-item'));
  if (!lightbox || !items.length) return;

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const imgSrc = item.dataset.full || item.querySelector('img')?.src;
    const caption = item.dataset.caption || '';

    lbImage.src = imgSrc;
    lbImage.alt = caption;
    lbCaption.textContent = caption;

    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Fade in
    lightbox.style.opacity = '0';
    requestAnimationFrame(() => {
      lightbox.style.transition = 'opacity 0.35s ease';
      lightbox.style.opacity = '1';
    });

    const panel = lightbox.querySelector('.lightbox-panel');
    panel?.focus();
  }

  function closeLightbox() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.style.display = 'none';
      lightbox.style.opacity = '';
      document.body.style.overflow = '';
      lbImage.src = '';
    }, 300);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  nextBtn?.addEventListener('click', showNext);
  prevBtn?.addEventListener('click', showPrev);

  // Backdrop click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (lightbox.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft')  showPrev();
  });

  // Swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? showNext() : showPrev();
  }, { passive: true });
}

/* ══════════════════════════════════════════
   11. BMI CALCULATOR
══════════════════════════════════════════ */
function initBMICalculator() {
  const form        = document.getElementById('bmiForm');
  const resultEl    = document.getElementById('bmiResult');
  const scoreEl     = document.getElementById('bmiScore');
  const categoryEl  = document.getElementById('bmiCategory');
  const messageEl   = document.getElementById('bmiMessage');
  const progressEl  = document.getElementById('bmiProgressFill');
  const errorEl     = document.getElementById('bmiError');
  const joinBtn     = document.getElementById('bmiJoinBtn');
  if (!form) return;

  const categories = [
    { max: 18.5, label: 'Underweight',    color: '#60a5fa', msg: 'You need more nutrition & strength training. Our expert trainers can build a plan for you.',   pct: 15 },
    { max: 25.0, label: 'Healthy Weight', color: '#22c55e', msg: 'Great work! Maintain your fitness with our classes. Keep pushing!',                             pct: 45 },
    { max: 30.0, label: 'Overweight',     color: '#facc15', msg: 'Time to step it up. Our cardio & personal training programs are perfect for you.',              pct: 68 },
    { max: 35.0, label: 'Obese Class I',  color: '#f97316', msg: 'Let\'s get started together. Join BodyLife and transform with expert guidance.',                 pct: 82 },
    { max: Infinity, label: 'Obese Class II+', color: '#ef4444', msg: 'Your health is our priority. Start your journey today — our trainers are here for you.', pct: 95 },
  ];

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (errorEl) errorEl.textContent = '';

    const weight = parseFloat(document.getElementById('weight')?.value);
    const height = parseFloat(document.getElementById('height')?.value);
    const age    = parseInt(document.getElementById('age')?.value, 10);

    if (!weight || !height || !age || weight <= 0 || height <= 0 || age <= 0) {
      if (errorEl) errorEl.textContent = 'Please enter valid weight, height and age.';
      return;
    }
    if (height > 300 || weight > 500) {
      if (errorEl) errorEl.textContent = 'Please enter realistic values.';
      return;
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const cat = categories.find(c => bmi < c.max);

    // Show result
    resultEl.classList.add('visible');
    resultEl.style.display = 'block';

    // Animate BMI score
    animateValue(scoreEl, 0, bmi, 1400, val => val.toFixed(1));

    // Category & message
    categoryEl.textContent = cat.label;
    categoryEl.style.color = cat.color;
    if (messageEl) messageEl.textContent = cat.msg;

    // Progress bar
    if (progressEl) {
      progressEl.style.width = '0%';
      setTimeout(() => {
        progressEl.style.transition = 'width 1.2s cubic-bezier(0.25,0.46,0.45,0.94)';
        progressEl.style.width = `${cat.pct}%`;
      }, 100);
    }

    // Scroll to result
    setTimeout(() => {
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  });

  function animateValue(el, start, end, duration, formatter) {
    const startTime = performance.now();
    function update(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatter(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}

/* ══════════════════════════════════════════
   12. GYM TIMINGS — LIVE STATUS
══════════════════════════════════════════ */
function initGymTimings() {
  const timingCards = document.querySelectorAll('.timing-card');
  if (!timingCards.length) return;

  function updateStatus() {
    const now    = new Date();
    const day    = now.getDay(); // 0=Sun
    const mins   = now.getHours() * 60 + now.getMinutes();

    timingCards.forEach(card => {
      const badge    = card.querySelector('.status-badge');
      if (!badge) return;

      const days     = card.dataset.days?.split(',').map(Number) || [];
      const startMin = parseInt(card.dataset.start, 10);
      const endMin   = parseInt(card.dataset.end, 10);
      const isToday  = days.includes(day);
      const isOpen   = isToday && mins >= startMin && mins < endMin;

      badge.textContent = isOpen ? '● Open Now' : '● Closed';
      badge.className   = `status-badge ${isOpen ? 'open' : 'closed'}`;
    });
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000);
}

/* ══════════════════════════════════════════
   13. CONTACT FORM
══════════════════════════════════════════ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const errorEl    = document.getElementById('contactError');
  const successEl  = document.getElementById('contactSuccess');
  const submitBtn  = form?.querySelector('.contact-submit');
  if (!form) return;

  // Real-time validation
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.style.borderColor === 'rgb(239, 68, 68)') validateField(field);
    });
  });

  function validateField(field) {
    const val = field.value.trim();
    let valid = true;

    if (field.required && !val) valid = false;
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) valid = false;
    if (field.type === 'tel' && val && !/^[0-9+\-\s]{7,20}$/.test(val)) valid = false;

    field.style.borderColor = valid ? '' : '#ef4444';
    field.style.boxShadow   = valid ? '' : '0 0 0 3px rgba(239,68,68,0.15)';
    return valid;
  }

  function validateAll() {
    let allValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) allValid = false;
    });
    return allValid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.textContent = '';
    if (successEl) successEl.classList.remove('show');

    if (!validateAll()) {
      if (errorEl) errorEl.textContent = 'Please fill in all required fields correctly.';
      return;
    }

    // Button loading state
    const originalText = submitBtn?.innerHTML;
    if (submitBtn) {
      submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }

    try {
      const action = form.getAttribute('action');

      // If the action is still the placeholder, just show success (demo mode)
      if (!action || action.includes('YOUR_EMAIL')) {
        await new Promise(r => setTimeout(r, 1400));
        showSuccess();
      } else {
        const data = new FormData(form);
        const res  = await fetch(action, { method: 'POST', body: data });
        if (res.ok) {
          showSuccess();
        } else {
          throw new Error('Server error');
        }
      }
    } catch {
      if (errorEl) errorEl.textContent = 'Something went wrong. Please call us directly.';
    } finally {
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
      }
    }
  });

  function showSuccess() {
    if (successEl) successEl.classList.add('show');
    form.reset();
    form.querySelectorAll('input, select, textarea').forEach(f => {
      f.style.borderColor = '';
      f.style.boxShadow = '';
    });
    setTimeout(() => successEl?.classList.remove('show'), 6000);
  }
}

/* ══════════════════════════════════════════
   14. SCROLL REVEAL (CUSTOM)
══════════════════════════════════════════ */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealEls = document.querySelectorAll(
    '.feature-card, .service-card, .pricing-card, .offer-card, .testimonial-card, .gallery-item, .timing-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════
   15. CURSOR GLOW (DESKTOP ONLY)
══════════════════════════════════════════ */
function initCursorGlow() {
  if (window.innerWidth < 1024) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  glow.id = 'cursorGlow';
  Object.assign(glow.style, {
    position:        'fixed',
    pointerEvents:   'none',
    zIndex:          '9998',
    width:           '400px',
    height:          '400px',
    borderRadius:    '50%',
    background:      'radial-gradient(circle, rgba(204,0,0,0.07) 0%, transparent 70%)',
    transform:       'translate(-50%, -50%)',
    transition:      'opacity 0.3s ease',
    opacity:         '0',
    top:             '0',
    left:            '0',
    willChange:      'transform',
  });
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX  = 0, glowY  = 0;
  let animating = false;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
    if (!animating) {
      animating = true;
      requestAnimationFrame(animateGlow);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
      requestAnimationFrame(animateGlow);
    } else {
      animating = false;
    }
  }

  // Grow on interactive elements
  const interactives = document.querySelectorAll('button, a, .service-card, .pricing-card, .feature-card, .gallery-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width  = '600px';
      glow.style.height = '600px';
      glow.style.background = 'radial-gradient(circle, rgba(204,0,0,0.11) 0%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width  = '400px';
      glow.style.height = '400px';
      glow.style.background = 'radial-gradient(circle, rgba(204,0,0,0.07) 0%, transparent 70%)';
    });
  });
}

/* ══════════════════════════════════════════
   16. TYPING EFFECT — HERO SUBTITLE
══════════════════════════════════════════ */
function initTypingEffect() {
  const el = document.querySelector('.hero-subheading');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const phrases = [
    'Start Your Transformation Today',
    'Expert Trainers. Real Results.',
    'Mumbai\'s Premier Fitness Hub',
    'Since 2001 · Andheri East',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  function type() {
    if (paused) return;

    const current = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; tick(); }, 2400);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    tick();
  }

  function tick() {
    const speed = deleting ? 38 : 72;
    setTimeout(type, speed);
  }

  // Small delay before starting
  setTimeout(tick, 1200);
}

/* ══════════════════════════════════════════
   17. PRICING CARD HOVER TILT
══════════════════════════════════════════ */
function initPricingHover() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const cards = document.querySelectorAll('.pricing-card, .service-card, .offer-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width / 2;
      const cy     = rect.height / 2;
      const tiltX  = ((y - cy) / cy) * 5;
      const tiltY  = ((cx - x) / cx) * 5;

      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease';
    });
  });

  // Featured card doesn't tilt
  const featured = document.querySelector('.pricing-card-featured');
  if (featured) {
    featured.addEventListener('mousemove', e => e.stopPropagation());
    featured.style.transform = '';
  }
}

/* ══════════════════════════════════════════
   18. LAZY IMAGE LOADING
══════════════════════════════════════════ */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.transition = 'opacity 0.5s ease';
        img.style.opacity = '0';
        img.addEventListener('load', () => {
          img.style.opacity = '1';
        }, { once: true });
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
}

/* ══════════════════════════════════════════
   19. STATS SECTION OBSERVER
══════════════════════════════════════════ */
function initStatsObserver() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  // Already handled by counter animations, this just adds the glow
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach((el, i) => {
          setTimeout(() => {
            el.style.textShadow = '0 0 30px rgba(204,0,0,0.4)';
          }, i * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ══════════════════════════════════════════
   20. INJECT BTN SPINNER STYLE
══════════════════════════════════════════ */
(function injectSpinnerCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .btn-spinner {
      display: inline-block;
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      vertical-align: middle;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .navbar { transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s ease, box-shadow 0.3s ease; }

    .contact-success.show { display: block !important; }
  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════
   21. JOIN NOW BUTTONS → PRICING SCROLL
══════════════════════════════════════════ */
(function initJoinButtons() {
  document.addEventListener('DOMContentLoaded', () => {}, { once: true });

  document.querySelectorAll('.pricing-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ══════════════════════════════════════════
   22. GALLERY IMAGE PRELOAD ON HOVER
══════════════════════════════════════════ */
(function initGalleryPreload() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const src = item.dataset.full;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    }, { once: true });
  });
})();

/* ══════════════════════════════════════════
   23. WINDOW RESIZE HANDLER
══════════════════════════════════════════ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-init AOS on resize
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 250);
}, { passive: true });

/* ══════════════════════════════════════════
   24. PAGE LOAD REVEAL
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Trigger AOS after full load
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refreshHard();
  }, 300);
});