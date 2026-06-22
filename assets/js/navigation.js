/**
 * wazabiCode — Configuration de navigation du cursus
 */
const WAZABI_NAV = {
  brand: 'wazabiCode',
  courseTitle: 'HTML, CSS, JS & Electron',
  sections: [
    {
      title: 'Accueil',
      items: [
        { id: 'accueil', label: 'Tableau de bord', href: 'index.html', icon: '🏠' },
      ],
    },
    {
      title: 'Fondamentaux',
      items: [
        { id: '00-introduction', label: 'Introduction Electron', href: 'pages/00-introduction.html', icon: '📖', level: 'Tous', hours: '8h' },
        { id: '01-installation', label: 'Installation', href: 'pages/01-installation.html', icon: '⚙️', level: 'Débutant', hours: '12h' },
        { id: '02-html5', label: 'HTML5', href: 'pages/02-html5.html', icon: '🏷️', level: 'Débutant', hours: '25h' },
        { id: '03-css3', label: 'CSS3', href: 'pages/03-css3.html', icon: '🎨', level: 'Débutant', hours: '30h' },
        { id: '04-javascript-debutant', label: 'JavaScript Débutant', href: 'pages/04-javascript-debutant.html', icon: '⚡', level: 'Débutant', hours: '25h' },
      ],
    },
    {
      title: 'Intermédiaire',
      items: [
        { id: '05-javascript-intermediaire', label: 'JavaScript Intermédiaire', href: 'pages/05-javascript-intermediaire.html', icon: '🔗', level: 'Inter.', hours: '30h' },
        { id: '06-javascript-avance', label: 'JavaScript Avancé', href: 'pages/06-javascript-avance.html', icon: '🚀', level: 'Inter.', hours: '35h' },
        { id: '07-sqlite', label: 'SQLite', href: 'pages/07-sqlite.html', icon: '🗄️', level: 'Inter.', hours: '20h' },
        { id: '08-nodejs', label: 'Node.js & API REST', href: 'pages/08-nodejs.html', icon: '🟢', level: 'Inter.', hours: '25h' },
      ],
    },
    {
      title: 'Electron',
      items: [
        { id: '09-electron', label: 'Electron.js', href: 'pages/09-electron.html', icon: '💻', level: 'Avancé', hours: '30h' },
        { id: '10-electron-sqlite', label: 'Electron + SQLite', href: 'pages/10-electron-sqlite.html', icon: '📦', level: 'Avancé', hours: '25h' },
        { id: '11-electron-api', label: 'Electron + API REST', href: 'pages/11-electron-api.html', icon: '🌐', level: 'Avancé', hours: '30h' },
      ],
    },
    {
      title: 'Expert',
      items: [
        { id: '12-debugging', label: 'Debugging', href: 'pages/12-debugging.html', icon: '🐛', level: 'Avancé', hours: '15h' },
        { id: '13-tests', label: 'Tests (Jest, Playwright)', href: 'pages/13-tests.html', icon: '✅', level: 'Expert', hours: '20h' },
        { id: '14-packaging', label: 'Packaging', href: 'pages/14-packaging.html', icon: '📀', level: 'Expert', hours: '15h' },
        { id: '15-deploiement', label: 'Déploiement & CI/CD', href: 'pages/15-deploiement.html', icon: '🚢', level: 'Expert', hours: '20h' },
      ],
    },
    {
      title: 'Projets',
      items: [
        { id: 'projet-notes', label: 'Gestionnaire de Notes', href: 'pages/projet-notes.html', icon: '📝', level: 'Débutant', hours: '15h' },
        { id: 'projet-meteo', label: 'Application Météo', href: 'pages/projet-meteo.html', icon: '🌤️', level: 'Inter.', hours: '20h' },
        { id: 'projet-tasks', label: 'Tasks Electron + SQLite', href: 'pages/projet-tasks.html', icon: '✔️', level: 'Avancé', hours: '25h' },
        { id: 'projet-saas', label: 'SaaS Desktop Expert', href: 'pages/projet-saas.html', icon: '🏆', level: 'Expert', hours: '60h' },
      ],
    },
  ],
};

/** Retourne le chemin relatif correct selon la profondeur de la page */
function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : './';
}

/** Trouve la page active dans la navigation */
function getActivePageId() {
  return document.body.dataset.page || 'accueil';
}

/** Pages précédente / suivante pour navigation bas de page */
function getAdjacentPages(currentId) {
  const all = WAZABI_NAV.sections.flatMap((s) => s.items);
  const idx = all.findIndex((item) => item.id === currentId);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
