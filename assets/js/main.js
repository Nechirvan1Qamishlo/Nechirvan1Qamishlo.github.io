// ============================================
// NECHIRVAN OTHMAN — Main JS
// ============================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- NAV: scroll state + mobile toggle ---
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navbar) {
  const onScrollNav = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();
}

function setMenu(open) {
  if (!navToggle || !navLinks) return;
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(4px, 4px)' : '';
  spans[1].style.opacity = open ? '0' : '';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(4px, -4px)' : '';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

// --- SCROLL ANIMATIONS ---
const animEls = document.querySelectorAll('[data-animate]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  animEls.forEach(el => el.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  animEls.forEach(el => observer.observe(el));
}

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navItems.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) { active.classList.add('active'); active.setAttribute('aria-current', 'true'); }
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));
}

const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: var(--text) !important; }' +
  '@keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }';
document.head.appendChild(style);

// --- PUBLICATION FILTER ---
const pubBtns = document.querySelectorAll('.pub-btn');
const pubItems = document.querySelectorAll('.pub-item');

pubBtns.forEach(btn => {
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
  btn.addEventListener('click', () => {
    pubBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    const filter = btn.dataset.filter;
    pubItems.forEach(item => {
      const types = (item.dataset.type || '').split(/\s+/);
      if (filter === 'all' || types.includes(filter)) {
        item.classList.remove('hidden');
        if (!reduceMotion) item.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// --- FILE LINKS (paper PDFs) ---
// Links marked data-file-check start hidden and only appear once the file
// actually exists in the repo (files/papers). Drop a PDF with the
// matching name into the folder and the button shows up automatically.
document.querySelectorAll('a[data-file-check]').forEach(link => {
  fetch(link.getAttribute('href'), { method: 'HEAD', cache: 'no-store' })
    .then(res => { if (res.ok) link.hidden = false; })
    .catch(() => {});
});

// --- FORMS (Formspree, sent in the background) ---
document.querySelectorAll('form[data-ajax-form]').forEach(form => {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const okText = form.dataset.success || 'Thank you — your message has been sent. I will get back to you soon.';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const label = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    if (status) { status.textContent = ''; status.className = 'form-status mono'; }
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      if (status) { status.textContent = okText; status.classList.add('ok'); }
    } catch (err) {
      if (status) {
        status.innerHTML = 'Something went wrong. Please email me directly at <a href="mailto:nechirvanothman@gmail.com">nechirvanothman@gmail.com</a>.';
        status.classList.add('err');
      }
    } finally {
      if (button) { button.disabled = false; button.textContent = label; }
    }
  });
});

// --- CURRENT YEAR ---
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// --- HERO PARALLAX (subtle) ---
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
if (!reduceMotion && (orb1 || orb2)) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (orb1) orb1.style.transform = `translateY(${y * 0.15}px)`;
      if (orb2) orb2.style.transform = `translateY(${y * -0.08}px)`;
      ticking = false;
    });
  }, { passive: true });
}
