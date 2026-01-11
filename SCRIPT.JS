// Mobile nav toggle, smooth scroll, and active nav highlighting

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle && navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Smooth scroll for nav links
navLinkItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // close mobile menu if open
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Active section highlighting using IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -40% 0px', // trigger earlier
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[data-target="${id}"]`);
    if (entry.isIntersecting) {
      navLinkItems.forEach(n => n.classList.remove('active'));
      navLink && navLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

console.log('Navigation JS initialized');

// Debug helper: highlight and log nav-related elements when you add ?navdebug=1 to the URL
(function navDebug(){
  if (!location.search.includes('navdebug=1')) return;
  const elements = [document.querySelector('nav'), document.querySelector('.logo'), document.querySelector('.logo-text'), document.querySelector('.logo-img'), document.querySelector('.nav-links')];
  console.log('Nav debug: computed styles for nav elements');
  elements.forEach(el => {
    if (!el) return;
    const cs = getComputedStyle(el);
    console.log(el.tagName + (el.className ? '.'+el.className : ''), {
      borderTop: cs.borderTop,
      borderRight: cs.borderRight,
      borderBottom: cs.borderBottom,
      borderLeft: cs.borderLeft,
      outline: cs.outline,
      background: cs.backgroundColor
    });
    // Add a subtle inset highlight so you can see which element aligns with the visible line
    el.style.boxShadow = 'inset 0 0 0 2px rgba(255,0,0,0.12)';
  });
})();

