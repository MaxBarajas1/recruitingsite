/* =============================================
   MONEY TREE FINANCIAL — RECRUITING SITE
   main.js — PREMIUM EDITION
   ============================================= */

// ── PALACE DOORS ENTRANCE ──
(function() {
  const entrance = document.getElementById('palaceEntrance');
  if (!entrance) return;
  document.body.style.overflow = 'hidden';

  function startOpening() {
    setTimeout(() => entrance.classList.add('opening'), 150);
    // 0.15s pause + 0.3s delay + 1.5s door = ~1.95s
    setTimeout(() => {
      entrance.classList.add('gone');
      document.body.style.overflow = '';
    }, 2000);
    setTimeout(() => entrance.remove(), 2700);
  }

  if (document.readyState === 'complete') {
    startOpening();
  } else {
    window.addEventListener('load', startOpening);
    setTimeout(startOpening, 2500);
  }
})();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── CUSTOM CURSOR (desktop only) ──
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
if (!isTouchDevice) {
  document.body.classList.add('cursor-on');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
  });

  // Ring follows with smooth lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor expand on hover
  const hoverables = document.querySelectorAll('a, button, input, textarea, select, .opp-card, .testimonial, .credential, .income-tier');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ── STAGGER GRID CHILDREN ──
document.querySelectorAll('.opportunity-grid, .testimonials-grid').forEach(grid => {
  grid.querySelectorAll(':scope > *').forEach((child, i) => {
    child.style.transitionDelay = (i * 0.06) + 's';
  });
});

// ── NAV SCROLL EFFECT ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.background = 'rgba(10,10,10,0.97)';
    nav.style.backdropFilter = 'blur(12px)';
    nav.style.borderBottom = '1px solid rgba(200,169,110,0.1)';
  } else {
    nav.style.background = '';
    nav.style.backdropFilter = '';
    nav.style.borderBottom = '';
  }
});

// ── STATS COUNTER ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.floor(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target.querySelector('.num[data-target]');
      if (num && !num.dataset.animated) {
        num.dataset.animated = 'true';
        animateCounter(num);
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.hero-stat').forEach(el => statsObserver.observe(el));

// ── INCOME BAR ANIMATION ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.tier-bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 150);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.income-tiers').forEach(el => barObserver.observe(el));

// ── 3D TILT ON CARDS ──
if (!isTouchDevice) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      card.style.setProperty('--mx', (x / rect.width * 100) + '%');
      card.style.setProperty('--my', (y / rect.height * 100) + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── MAGNETIC BUTTONS ──
if (!isTouchDevice) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    const strength = 0.3;
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── HERO PARTICLES ──
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  const count = isTouchDevice ? 12 : 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = (-Math.random() * 100) + 'px';
    p.style.animationDuration = (12 + Math.random() * 18) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.opacity = (0.4 + Math.random() * 0.4).toString();
    const size = 1 + Math.random() * 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    particlesContainer.appendChild(p);
  }
}

// ── HERO PARALLAX ──
const heroGrid = document.querySelector('.hero-bg-grid');
const heroOrb = document.querySelector('.hero-orb');
const heroWord = document.querySelector('.hero-bg-word');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.3}px)`;
    if (heroOrb) heroOrb.style.transform = `translate(${y * 0.1}px, ${y * 0.2}px)`;
    if (heroWord) heroWord.style.transform = `translateX(-50%) translateY(${y * -0.15}px)`;
  }
});

// ── CURSOR "VIEW" LABEL on cards ──
if (!isTouchDevice) {
  const viewables = document.querySelectorAll('.opp-card, .testimonial');
  const cursorRing = document.getElementById('cursorRing');
  viewables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('view-label');
      cursorRing.classList.remove('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('view-label');
    });
  });
}

// ── FLOATING MOBILE CTA ──
const floatingCta = document.getElementById('floatingCta');
if (floatingCta) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const contactSection = document.getElementById('contact');
    const contactTop = contactSection ? contactSection.offsetTop : Infinity;
    // Show after scrolling past first viewport, hide when near contact form
    if (scrolled > window.innerHeight * 0.6 && scrolled < contactTop - 300) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  });
}

// ── FORM SUBMIT ──
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('form-success').style.display = 'block';
  const btn = e.target.querySelector('button[type="submit"]');
  btn.style.opacity = '0.4';
  btn.disabled = true;
}