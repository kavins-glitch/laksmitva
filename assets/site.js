function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  const btn1 = document.getElementById('navToggle');
  if (btn1) btn1.setAttribute('aria-expanded', String(open));
  const btn2 = document.getElementById('burger');
  if (btn2) btn2.setAttribute('aria-expanded', String(open));
}

function toggleMenu() {
  setMenu(!document.body.classList.contains('menu-open'));
}

function setActiveNav() {
  const path = (window.location.pathname || '').split('/').pop() || 'index.html';
  const current = path.toLowerCase();

  document.querySelectorAll('[data-nav]').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const isCurrent = href === current;
    if (isCurrent) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function wireNav() {
  const toggleBtn = document.getElementById('navToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleMenu);
  const burger = document.getElementById('burger');
  if (burger) burger.addEventListener('click', toggleMenu);

  // Close drawer when any nav link is clicked
  document.querySelectorAll('.mobile-drawer a').forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });

  // Esc closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Nav border effect on scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.style.borderBottomColor = (window.scrollY > 50)
      ? 'rgba(201,168,76,0.32)'
      : 'rgba(201,168,76,0.2)';
  });
}

function wireContactForm() {
  const btn = document.getElementById('sendBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const fname = document.getElementById('fname')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!fname || !email || !message) {
      alert('Please fill in your name, email, and message to continue.');
      return;
    }

    const msg = document.getElementById('formMsg');
    if (msg) {
      msg.style.display = 'block';
      msg.className = 'form-msg success';
    }

    ['fname','lname','email','company','inquiry','message'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  });
}

function wireFaqAccordion() {
  const root = document.getElementById('faq');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('details.faq-item'));
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function wireNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail')?.value?.trim();
    if (!email) return;
    const msg = document.getElementById('newsletterMsg');
    if (msg) msg.style.display = 'block';
    const input = document.getElementById('newsletterEmail');
    if (input) input.value = '';
  });
}

function wireLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Allow a tiny delay so animation shows smoothly
  window.addEventListener('load', () => {
    setTimeout(() => document.body.classList.add('loaded'), 250);
  });
}

function wireCursor() {
  // Only for non-touch pointers (CSS shows/hides)
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  let rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    rx = e.clientX;
    ry = e.clientY;
  });

  // Smooth follow for ring
  let cx = 0, cy = 0;
  const tick = () => {
    cx += (rx - cx) * 0.16;
    cy += (ry - cy) * 0.16;
    ring.style.left = `${cx}px`;
    ring.style.top = `${cy}px`;
    requestAnimationFrame(tick);
  };
  tick();
}

function wireLandingScrollSpy() {
  const nav = document.getElementById('nav');
  if (!nav) return; // only landing

  const links = Array.from(nav.querySelectorAll('.nav-links a'));
  const ids = links.map((a) => (a.getAttribute('href') || '').replace('#', '')).filter(Boolean);
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((a) => a.classList.toggle('act', (a.getAttribute('href') === `#${id}`)));
    document.querySelectorAll('#mobileDrawer .mobile-links a').forEach((a) => {
      a.classList.toggle('act', (a.getAttribute('href') === `#${id}`));
    });
  };

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];
    if (!visible?.target?.id) return;
    setActive(visible.target.id);
  }, { root: null, threshold: [0.25, 0.45, 0.65], rootMargin: '-20% 0px -60% 0px' });

  sections.forEach((s) => io.observe(s));

  // Smooth scroll offset behavior handled by body padding; close menu on click
  [...links, ...Array.from(document.querySelectorAll('#mobileDrawer a'))].forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  wireNav();
  wireContactForm();
  wireFaqAccordion();
  wireNewsletter();
  wireLoader();
  wireCursor();
  wireLandingScrollSpy();
});

