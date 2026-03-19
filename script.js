/**
 * Rikesh Giri Portfolio — script.js
 * Personalized for: Rikesh Giri | BCA Student & Full-Stack Developer | Nepal
 */
'use strict';

/* ═══════ 1. LOADER ════════════════════════════════ */
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Trigger hero reveals
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 160);
    });
  }, 1900);
});
document.body.style.overflow = 'hidden';


/* ═══════ 2. CUSTOM CURSOR ════════════════════════ */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
(function animRing() {
  rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();

const hoverSel = 'a, button, input, textarea, select, .project-card, .pf-btn, .jt-btn, .contact-link';
document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel)) ring.classList.add('hovering'); });
document.addEventListener('mouseout',  e => { if (e.target.closest(hoverSel)) ring.classList.remove('hovering'); });


/* ═══════ 3. TYPED ANIMATION ══════════════════════ */
const typedEl = document.getElementById('typedText');
const phrases = [
  'Full-Stack Developer',
  'React Developer',
  'Node.js Engineer',
  'Problem Solver',
  'Open Source Dev',
];
let pi = 0, ci = 0, deleting = false;

function type() {
  if (!typedEl) return;
  const cur = phrases[pi];
  typedEl.textContent = deleting
    ? cur.substring(0, ci - 1)
    : cur.substring(0, ci + 1);
  deleting ? ci-- : ci++;

  let delay = deleting ? 55 : 100;
  if (!deleting && ci === cur.length) { delay = 2200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
  setTimeout(type, delay);
}
setTimeout(type, 2300);


/* ═══════ 4. NAVBAR ═══════════════════════════════ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));
}, { passive: true });


/* ═══════ 5. HAMBURGER ════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}));
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); }
});


/* ═══════ 6. THEME TOGGLE ══════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

const saved = localStorage.getItem('rg-theme') || 'dark';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('rg-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});


/* ═══════ 7. INTERSECTION OBSERVER — Reveals ══════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const group = entry.target.closest('.skills-grid, .projects-grid, .timeline, .traits-grid, .contact-grid, .about-grid');
    if (group) {
      const siblings = [...group.querySelectorAll('.reveal:not(.visible)')];
      siblings.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 90));
    }
    entry.target.classList.add('visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ═══════ 8. SKILL BAR ANIMATION ══════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.sb-fill').forEach(bar => {
      const w = bar.dataset.w;
      setTimeout(() => bar.style.width = w + '%', 150);
    });
    barObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(el => barObs.observe(el));


/* ═══════ 9. PROJECT FILTER ════════════════════════ */
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 60);
      }
    });
  });
});


/* ═══════ 10. JOURNEY TABS ═════════════════════════ */
const tabBtns = document.querySelectorAll('.jt-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.timeline').forEach(t => t.classList.add('hidden'));
    const active = document.getElementById('tab-' + btn.dataset.tab);
    if (active) {
      active.classList.remove('hidden');
      active.querySelectorAll('.reveal').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 60 + i * 100);
      });
    }
  });
});
// Show education by default
const eduTab = document.getElementById('tab-education');
if (eduTab) {
  document.querySelectorAll('.timeline').forEach(t => t.classList.add('hidden'));
  eduTab.classList.remove('hidden');
  setTimeout(() => {
    eduTab.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 60 + i * 100);
    });
  }, 2200);
}


/* ═══════ 11. CONTACT FORM ═════════════════════════ */
const form        = document.getElementById('contactForm');
const fnameInput  = document.getElementById('fname');
const emailInput  = document.getElementById('email');
const msgInput    = document.getElementById('message');
const charCount   = document.getElementById('charCount');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (msgInput) {
  msgInput.addEventListener('input', () => {
    const l = Math.min(msgInput.value.length, 500);
    if (msgInput.value.length > 500) msgInput.value = msgInput.value.slice(0, 500);
    charCount.textContent = l + ' / 500';
  });
}

const setErr = (el, eid, msg) => {
  el.classList.add('invalid');
  const e = document.getElementById(eid);
  if (e) e.textContent = msg;
};
const clrErr = (el, eid) => {
  el.classList.remove('invalid');
  const e = document.getElementById(eid);
  if (e) e.textContent = '';
};
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

if (fnameInput) fnameInput.addEventListener('blur', () => fnameInput.value.trim() ? clrErr(fnameInput,'fnameError') : setErr(fnameInput,'fnameError','Name is required.'));
if (emailInput) emailInput.addEventListener('blur', () => {
  if (!emailInput.value.trim()) setErr(emailInput,'emailError','Email is required.');
  else if (!validEmail(emailInput.value)) setErr(emailInput,'emailError','Enter a valid email address.');
  else clrErr(emailInput,'emailError');
});
if (msgInput) msgInput.addEventListener('blur', () => msgInput.value.trim().length >= 10 ? clrErr(msgInput,'messageError') : setErr(msgInput,'messageError','Message must be at least 10 characters.'));

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    if (!fnameInput.value.trim()) { setErr(fnameInput,'fnameError','Name is required.'); ok = false; }
    else clrErr(fnameInput,'fnameError');
    if (!emailInput.value.trim()) { setErr(emailInput,'emailError','Email is required.'); ok = false; }
    else if (!validEmail(emailInput.value)) { setErr(emailInput,'emailError','Enter a valid email.'); ok = false; }
    else clrErr(emailInput,'emailError');
    if (msgInput.value.trim().length < 10) { setErr(msgInput,'messageError','At least 10 characters needed.'); ok = false; }
    else clrErr(msgInput,'messageError');
    if (!ok) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      charCount.textContent = '0 / 500';
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.style.opacity = '1';
      formSuccess.classList.remove('hidden');
      setTimeout(() => formSuccess.classList.add('hidden'), 7000);
    }, 1800);
  });
}


/* ═══════ 12. SMOOTH SCROLL ═══════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
  });
});


/* ═══════ 13. FOOTER YEAR ══════════════════════════ */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();


/* ═══════ CONSOLE SIGNATURE ════════════════════════ */
console.log('%c  Rikesh Giri ', 'background:#8b5cf6;color:#fff;font-family:monospace;font-size:15px;padding:6px 14px;border-radius:5px;font-weight:700;');
console.log('%c  BCA Student · Full-Stack Developer · Nepal 🇳🇵 ', 'color:#9898c8;font-family:monospace;font-size:11px;');
