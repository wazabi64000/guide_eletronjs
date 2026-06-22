/**
 * wazabiCode — Navigation du cursus Electron.js
 */
const WAZABI_NAV = {
  brand: 'wazabiCode',
  courseTitle: 'Electron.js — Débutant à Expert',
  sections: [
    {
      title: 'Accueil',
      items: [
        { id: 'accueil', label: 'Tableau de bord', href: 'index.html', icon: '🏠' },
      ],
    },
    {
      title: 'Débutant',
      items: [
        { id: '00-introduction', label: 'Introduction à Electron', href: 'pages/00-introduction.html', icon: '📖', level: 'Débutant', hours: '4h' },
        { id: '01-installation', label: 'Environnement de dev', href: 'pages/01-installation.html', icon: '⚙️', level: 'Débutant', hours: '6h' },
        { id: '02-premiers-pas', label: 'Premiers pas Electron', href: 'pages/02-premiers-pas.html', icon: '🚀', level: 'Débutant', hours: '10h' },
        { id: '03-fenetres', label: 'Fenêtres & cycle de vie', href: 'pages/03-fenetres.html', icon: '🪟', level: 'Débutant', hours: '8h' },
      ],
    },
    {
      title: 'Intermédiaire',
      items: [
        { id: '04-preload-ipc', label: 'Preload & IPC', href: 'pages/04-preload-ipc.html', icon: '🔗', level: 'Inter.', hours: '12h' },
        { id: '05-securite', label: 'Sécurité Electron', href: 'pages/05-securite.html', icon: '🔒', level: 'Inter.', hours: '8h' },
        { id: '06-ui-native', label: 'UI native & menus', href: 'pages/06-ui-native.html', icon: '🎛️', level: 'Inter.', hours: '10h' },
        { id: '07-fichiers', label: 'Système de fichiers', href: 'pages/07-fichiers.html', icon: '📁', level: 'Inter.', hours: '8h' },
      ],
    },
    {
      title: 'Avancé',
      items: [
        { id: '08-sqlite', label: 'SQLite dans Electron', href: 'pages/08-sqlite.html', icon: '🗄️', level: 'Avancé', hours: '12h' },
        { id: '09-api-rest', label: 'API REST & JWT', href: 'pages/09-api-rest.html', icon: '🌐', level: 'Avancé', hours: '12h' },
        { id: '10-sync-offline', label: 'Sync & mode offline', href: 'pages/10-sync-offline.html', icon: '🔄', level: 'Avancé', hours: '10h' },
        { id: '11-architecture', label: 'Architecture propre', href: 'pages/11-architecture.html', icon: '🏗️', level: 'Avancé', hours: '12h' },
      ],
    },
    {
      title: 'Expert',
      items: [
        { id: '12-debugging', label: 'Debugging', href: 'pages/12-debugging.html', icon: '🐛', level: 'Expert', hours: '8h' },
        { id: '13-tests', label: 'Tests Jest & Playwright', href: 'pages/13-tests.html', icon: '✅', level: 'Expert', hours: '10h' },
        { id: '14-packaging', label: 'Packaging multi-OS', href: 'pages/14-packaging.html', icon: '📀', level: 'Expert', hours: '8h' },
        { id: '15-deploiement', label: 'Déploiement & CI/CD', href: 'pages/15-deploiement.html', icon: '🚢', level: 'Expert', hours: '8h' },
      ],
    },
    {
      title: 'Projets Electron',
      items: [
        { id: 'projet-bloc-notes', label: 'Bloc-notes Desktop', href: 'pages/projet-bloc-notes.html', icon: '📝', level: 'Débutant', hours: '12h' },
        { id: 'projet-fichiers', label: 'Gestionnaire de fichiers', href: 'pages/projet-fichiers.html', icon: '📂', level: 'Inter.', hours: '15h' },
        { id: 'projet-tasks', label: 'Tasks + SQLite', href: 'pages/projet-tasks.html', icon: '✔️', level: 'Avancé', hours: '20h' },
        { id: 'projet-saas', label: 'SaaS Desktop Expert', href: 'pages/projet-saas.html', icon: '🏆', level: 'Expert', hours: '40h' },
      ],
    },
  ],
};

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : './';
}

function getActivePageId() {
  return document.body.dataset.page || 'accueil';
}

function getAdjacentPages(currentId) {
  const all = WAZABI_NAV.sections.flatMap((s) => s.items);
  const idx = all.findIndex((item) => item.id === currentId);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
