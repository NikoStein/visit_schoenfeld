/* ============================================
   Visit Schönfeld - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCarousel();
  initEventsTabs();
  initScrollAnimations();
  initScrollToTop();
  initCookieBanner();
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }
}

/* ---------- Hero Carousel ---------- */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow.prev');
  const nextBtn = document.querySelector('.hero-arrow.next');

  if (slides.length === 0) return;

  let current = 0;
  let interval;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(i);
      startAutoplay();
    });
  });

  // Start
  startAutoplay();
}

/* ---------- Events Tabs ---------- */
function initEventsTabs() {
  const tabs = document.querySelectorAll('.events-tab');
  const grids = document.querySelectorAll('.events-grid');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      grids.forEach(g => g.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}

/* ---------- Scroll to Top ---------- */
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Cookie Banner ---------- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Show after a brief delay
  if (!localStorage.getItem('schoenfeld-cookies')) {
    setTimeout(() => banner.classList.add('visible'), 2000);
  }

  banner.querySelectorAll('.cookie-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      banner.classList.remove('visible');
      localStorage.setItem('schoenfeld-cookies', 'accepted');
    });
  });
}
