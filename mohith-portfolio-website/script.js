(() => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  const scrollProgress = document.getElementById('scrollProgress');
  const copyButton = document.getElementById('copyEmail');
  const copyStatus = document.getElementById('copyStatus');
  const email = 'mohith.mk96@gmail.com';

  // Restore the visitor's preferred theme when possible.
  try {
    if (localStorage.getItem('mk-portfolio-theme') === 'light') body.classList.add('light-theme');
  } catch (_) { /* Storage may be unavailable in private browsing. */ }
  const updateThemeLabel = () => {
    const light = body.classList.contains('light-theme');
    themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle?.setAttribute('title', light ? 'Switch to dark theme' : 'Switch to light theme');
  };
  updateThemeLabel();
  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    try { localStorage.setItem('mk-portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark'); } catch (_) {}
    updateThemeLabel();
  });

  // Mobile navigation.
  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  }));

  // Project filters.
  const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
  }));

  // Copy email address with a graceful fallback.
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Email address copied.';
    } catch (_) {
      window.location.href = `mailto:${email}`;
      copyStatus.textContent = 'Opening your email app.';
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 3500);
  });

  // Reading progress indicator.
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();