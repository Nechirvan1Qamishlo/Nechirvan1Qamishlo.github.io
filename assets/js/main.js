// ============================================
// NECHIRVAN OTHMAN — Main JS
// ============================================

// --- NAV: scroll state + mobile toggle ---
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// --- SCROLL ANIMATIONS ---
const animEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

animEls.forEach(el => observer.observe(el));

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Add active style via JS class
const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: var(--text) !important; }';
document.head.appendChild(style);

// --- PUBLICATION FILTER ---
const pubBtns = document.querySelectorAll('.pub-btn');
const pubItems = document.querySelectorAll('.pub-item');

pubBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pubBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    pubItems.forEach(item => {
      const types = item.dataset.type || '';
      if (filter === 'all' || types.includes(filter)) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// fadeIn animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }';
document.head.appendChild(fadeStyle);

// --- SMOOTH CONTACT FORM (demo prevention) ---
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    const action = form.getAttribute('action');
    if (action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      alert('To activate the contact form, replace YOUR_FORM_ID in the HTML with your Formspree form ID. Visit formspree.io to get one for free.');
    }
  });
}

// --- HERO PARALLAX (subtle) ---
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translateY(${scrolled * 0.15}px)`;
  if (orb2) orb2.style.transform = `translateY(${scrolled * -0.08}px)`;
}, { passive: true });
