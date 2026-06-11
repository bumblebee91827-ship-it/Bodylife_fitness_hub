/* ========================================
   BODYLIFE FITNESS HUB - MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const progressBar = document.getElementById('progressBar');

    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }

    // ========================================
    // NAVBAR FUNCTIONALITY
    // ========================================
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMobileMenu = document.getElementById('navbarMobileMenu');
    const navbarBackdrop = document.getElementById('navbarBackdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarMobileLinks = document.querySelectorAll('.navbar-mobile-link');
    const sections = document.querySelectorAll('section[id]');
    let isMenuOpen = false;

    // Toggle mobile menu
    navbarToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navbarToggle.classList.toggle('active');
        navbarMobileMenu.classList.toggle('active');
        navbarBackdrop.classList.toggle('active');
        navbarToggle.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');
        
        // Prevent body scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when backdrop is clicked
    navbarBackdrop.addEventListener('click', function() {
        if (isMenuOpen) {
            isMenuOpen = false;
            navbarToggle.classList.remove('active');
            navbarMobileMenu.classList.remove('active');
            navbarBackdrop.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when a link is clicked and update active state
    [...navLinks, ...navbarMobileLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            navbarMobileLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if it's open
            if (isMenuOpen && this.classList.contains('navbar-mobile-link')) {
                isMenuOpen = false;
                navbarToggle.classList.remove('active');
                navbarMobileMenu.classList.remove('active');
                navbarBackdrop.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Navbar scroll effect and active link highlighting
    function updateNavbarOnScroll() {
        // Add backdrop blur and dark background after 80px
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if section is in viewport
            if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
                currentSection = sectionId;
            }
        });

        // Update active state for all nav links
        navLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        navbarMobileLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize on page load
    updateNavbarOnScroll();
    updateProgressBar();

    // ========================================
    // HERO PARALLAX EFFECT
    // ========================================
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            // Parallax effect: move background slower than scroll
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }

    // ========================================
    // HERO COUNTER ANIMATION
    // ======================================== 
    function animateHeroCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        let countersStarted = false;

        // Function to animate a single counter
        function countUp(element, target) {
            let current = 0;
            const increment = target / 50; // 50 frames for animation
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                element.textContent = Math.floor(current);
            }, 30);
        }

        // Check if hero stats are in viewport and start animation
        function checkAndStartCounters() {
            if (!countersStarted && statNumbers.length > 0) {
                const firstStat = statNumbers[0];
                const rect = firstStat.getBoundingClientRect();
                
                // Start animation when stat is in viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    countersStarted = true;
                    statNumbers.forEach(element => {
                        const target = parseInt(element.getAttribute('data-target'));
                        if (target) {
                            countUp(element, target);
                        }
                    });
                }
            }
        }

        // Check immediately and on scroll
        checkAndStartCounters();
        window.addEventListener('scroll', checkAndStartCounters, { once: false });
    }

    // Initialize hero counters
    animateHeroCounters();

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // BMI CALCULATOR
    // ========================================
    const bmiForm = document.getElementById('bmiForm');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const bmiError = document.getElementById('bmiError');
    const bmiResult = document.getElementById('bmiResult');
    const bmiScore = document.getElementById('bmiScore');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiMessage = document.getElementById('bmiMessage');
    const bmiProgressFill = document.getElementById('bmiProgressFill');
    const bmiJoinBtn = document.getElementById('bmiJoinBtn');

    function animateBmiValue(target) {
        const duration = 800;
        const startValue = 0;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = startValue + (target - startValue) * progress;
            bmiScore.textContent = current.toFixed(1);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                bmiScore.textContent = target.toFixed(1);
            }
        }

        window.requestAnimationFrame(step);
    }

    function setBmiResult(bmi, category, color, message) {
        bmiCategory.textContent = category;
        bmiCategory.style.color = color;
        bmiMessage.textContent = message;
        bmiProgressFill.style.width = `${Math.min((bmi / 40) * 100, 100)}%`;
        bmiProgressFill.style.backgroundColor = color;
        bmiResult.classList.add('show');
        bmiJoinBtn.classList.add('visible');
        animateBmiValue(bmi);
    }

    function showBmiError(message) {
        bmiError.textContent = message;
        bmiResult.classList.remove('show');
        bmiJoinBtn.classList.remove('visible');
    }

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseInt(ageInput.value, 10);
        const gender = genderSelect.value;

        bmiError.textContent = '';

        if (!weight || weight <= 0) {
            showBmiError('Please enter a valid weight in kilograms.');
            weightInput.focus();
            return;
        }

        if (!height || height <= 0) {
            showBmiError('Please enter a valid height in centimeters.');
            heightInput.focus();
            return;
        }

        if (!age || age <= 0) {
            showBmiError('Please enter a valid age.');
            ageInput.focus();
            return;
        }

        if (!gender) {
            showBmiError('Please select your gender.');
            genderSelect.focus();
            return;
        }

        const heightInMeters = height / 100;
        const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

        let category = '';
        let color = '';
        let message = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#3b82f6';
            message = 'Visit us at BodyLife to start your transformation!';
        } else if (bmi < 25) {
            category = 'Normal Weight';
            color = '#10b981';
            message = 'Great shape! Keep it up with our training.';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#f59e0b';
            message = 'Visit us at BodyLife to start your transformation!';
        } else {
            category = 'Obese';
            color = '#ef4444';
            message = 'Visit us at BodyLife to start your transformation!';
        }

        setBmiResult(bmi, category, color, message);
    }

    bmiForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateBMI();
    });

    weightInput?.addEventListener('input', function() {
        if (bmiError.textContent) bmiError.textContent = '';
    });

    heightInput?.addEventListener('input', function() {
        if (bmiError.textContent) bmiError.textContent = '';
    });

    ageInput?.addEventListener('input', function() {
        if (bmiError.textContent) bmiError.textContent = '';
    });

    genderSelect?.addEventListener('change', function() {
        if (bmiError.textContent) bmiError.textContent = '';
    });

    // ========================================
    // GYM TIMINGS STATUS
    // ========================================
    function updateGymTimings() {
        const timingCards = document.querySelectorAll('#timings .timing-card');
        const now = new Date();
        const today = now.getDay();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        timingCards.forEach(card => {
            const days = card.getAttribute('data-days').split(',').map(Number);
            const start = parseInt(card.getAttribute('data-start'), 10);
            const end = parseInt(card.getAttribute('data-end'), 10);
            const badge = card.querySelector('.status-badge');
            const isToday = days.includes(today);
            const isOpen = isToday && currentMinutes >= start && currentMinutes < end;

            card.classList.toggle('active-day', isToday);

            if (isOpen) {
                badge.textContent = 'Open Now';
                badge.classList.add('open');
                badge.classList.remove('closed');
            } else {
                badge.textContent = 'Closed';
                badge.classList.add('closed');
                badge.classList.remove('open');
            }
        });
    }

    updateGymTimings();
    setInterval(updateGymTimings, 60000);

    // ========================================
    // GALLERY LIGHTBOX
    // ========================================
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let activeGalleryIndex = 0;

    function updateLightbox(index) {
        const item = galleryItems[index];
        if (!item) return;

        const src = item.getAttribute('data-full') || item.querySelector('img').src;
        const caption = item.getAttribute('data-caption') || item.querySelector('img').alt || '';

        lightboxImage.src = src;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;
        activeGalleryIndex = index;
    }

    function openLightbox(index) {
        updateLightbox(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        lightbox.setAttribute('aria-hidden', 'true');
    }

    function showNextImage() {
        const nextIndex = (activeGalleryIndex + 1) % galleryItems.length;
        updateLightbox(nextIndex);
    }

    function showPrevImage() {
        const prevIndex = (activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox(prevIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxNext?.addEventListener('click', showNextImage);
    lightboxPrev?.addEventListener('click', showPrevImage);

    lightbox?.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (!lightbox.classList.contains('active')) return;

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'ArrowRight') {
            showNextImage();
        }

        if (event.key === 'ArrowLeft') {
            showPrevImage();
        }
    });

    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const contactError = document.getElementById('contactError');
    const contactSuccess = document.getElementById('contactSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value.trim();
            const phone = this.querySelector('input[name="phone"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const interest = this.querySelector('select[name="interest"]').value;
            const message = this.querySelector('textarea[name="message"]').value.trim();
            const honey = this.querySelector('input[name="_honey"]').value;

            contactError.textContent = '';
            contactSuccess.classList.remove('visible');

            if (honey) {
                return;
            }

            if (!name || !phone || !email || !interest || !message) {
                contactError.textContent = 'Please fill in all fields before sending your enquiry.';
                e.preventDefault();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                contactError.textContent = 'Please enter a valid email address.';
                e.preventDefault();
                return;
            }

            const phonePattern = /^[0-9+\- ]{7,20}$/;
            if (!phonePattern.test(phone)) {
                contactError.textContent = 'Please enter a valid phone number.';
                e.preventDefault();
                return;
            }

            contactSuccess.classList.add('visible');
        });
    }

    // ========================================
    // BUTTON CLICK EFFECTS
    // ========================================
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // SCROLL TO TOP BUTTON (Optional)
    // ========================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: rgba(204, 0, 0, 0.8);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 998;
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(204, 0, 0, 1)';
        this.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(204, 0, 0, 0.8)';
        this.style.transform = 'scale(1)';
    });

    // ========================================
    // PERFORMANCE: REQUEST ANIMATION FRAME
    // ========================================
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavbarOnScroll();
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // INITIALIZE AOS (Animate On Scroll)
    // ========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c🏋️ Welcome to BodyLife Fitness Hub! 🏋️', 'color: #CC0000; font-size: 16px; font-weight: bold;');
    console.log('%cTransform your fitness journey with us!', 'color: #999999; font-size: 14px;');

});
