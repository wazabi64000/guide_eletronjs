/**
 * wazabiCode — Injection du layout (navbar, sidebar, footer)
 */
(function initLayout() {
  const base = getBasePath();
  const activeId = getActivePageId();
  const contentEl = document.getElementById('page-content');

  if (!contentEl) return;

  // ─── Navbar ───
  const navbar = document.createElement('header');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <a href="${base}index.html" class="navbar__brand">
      <div class="navbar__logo">Wz</div>
      <div class="navbar__title"><span>wazabi</span>Code — ${WAZABI_NAV.courseTitle}</div>
    </a>
    <div class="navbar__actions">
      <span class="navbar__badge">~70h · Doc officielle Electron</span>
      <button class="navbar__toggle" id="sidebar-toggle" aria-label="Menu">☰</button>
    </div>
  `;

  // ─── Sidebar ───
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  let sidebarHTML = '<nav class="sidebar__inner">';
  WAZABI_NAV.sections.forEach((section) => {
    sidebarHTML += `<div class="sidebar__section-title">${section.title}</div>`;
    section.items.forEach((item) => {
      const isActive = item.id === activeId;
      const href = item.href.startsWith('pages/') && base === '../'
        ? item.href.replace('pages/', '')
        : base + item.href.replace(/^\.\//, '');
      sidebarHTML += `
        <a href="${href}"
           class="sidebar__link${isActive ? ' sidebar__link--active' : ''}"
           data-page="${item.id}">
          <span class="sidebar__link-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.hours ? `<span class="sidebar__link-meta">${item.hours}</span>` : ''}
        </a>`;
    });
  });
  sidebarHTML += '</nav>';
  sidebar.innerHTML = sidebarHTML;

  // ─── Overlay mobile ───
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';

  // ─── Footer wazabiCode ───
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer__brand"><strong>wazabi</strong>Code</div>
    <div class="footer__copy">© ${new Date().getFullYear()} wazabiCode — Formation Electron.js</div>
    <div class="footer__links">
      <a href="${base}index.html">Accueil</a>
      <a href="${base}pages/00-introduction.html">Cours</a>
      <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
    </div>
  `;

  // ─── Layout wrapper ───
  const layout = document.createElement('div');
  layout.className = 'app-layout';

  const main = document.createElement('main');
  main.className = 'main-content';
  main.appendChild(contentEl);

  layout.appendChild(sidebar);
  layout.appendChild(main);

  document.body.prepend(navbar);
  document.body.appendChild(overlay);
  document.body.appendChild(layout);
  document.body.appendChild(footer);

  // ─── Navigation prev/next ───
  const { prev, next } = getAdjacentPages(activeId);
  if (prev || next) {
    const nav = document.createElement('nav');
    nav.className = 'page-nav';
    nav.setAttribute('aria-label', 'Navigation chapitres');

    const fixHref = (href) => {
      if (base === '../' && href.startsWith('pages/')) return href.replace('pages/', '');
      return base + href.replace(/^\.\//, '');
    };

    if (prev) {
      nav.innerHTML += `
        <a href="${fixHref(prev.href)}" class="prev">
          <span class="page-nav__label">← Précédent</span>
          <span class="page-nav__title">${prev.label}</span>
        </a>`;
    }
    if (next) {
      nav.innerHTML += `
        <a href="${fixHref(next.href)}" class="next">
          <span class="page-nav__label">Suivant →</span>
          <span class="page-nav__title">${next.label}</span>
        </a>`;
    }
    main.appendChild(nav);
  }
})();
