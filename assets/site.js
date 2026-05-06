function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  const btn = document.getElementById('navToggle');
  if (btn) btn.setAttribute('aria-expanded', String(open));
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

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  wireNav();
  wireContactForm();
  wireFaqAccordion();
  wireNewsletter();
});

