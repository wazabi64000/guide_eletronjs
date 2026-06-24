/**
 * wazabiCode — Cursus Electron.js (documentation officielle)
 * Parcours débutant : zéro → .exe / .dmg / .AppImage + tests
 */
const WAZABI_NAV = {
  brand: 'wazabiCode',
  courseTitle: 'Electron.js — De zéro à l\'exécutable',
  sections: [
    {
      title: 'Accueil',
      items: [
        { id: 'accueil', label: 'Tableau de bord', href: 'index.html', icon: '🏠' },
      ],
    },
    {
      title: 'Étape 1 — Démarrer',
      items: [
        { id: '00-introduction', label: 'Qu\'est-ce qu\'Electron ?', href: 'pages/00-introduction.html', icon: '📖', level: 'Débutant', hours: '2h' },
        { id: '01-installation', label: 'Installation officielle', href: 'pages/01-installation.html', icon: '⚙️', level: 'Débutant', hours: '3h' },
        { id: '02-premiere-page', label: 'Votre première page', href: 'pages/02-premiere-page.html', icon: '📄', level: 'Débutant', hours: '3h' },
        { id: '03-main-js', label: 'Le fichier main.js', href: 'pages/03-main-js.html', icon: '⚡', level: 'Débutant', hours: '4h' },
      ],
    },
    {
      title: 'Étape 2 — Comprendre',
      items: [
        { id: '04-processus', label: 'Main & Renderer', href: 'pages/04-processus.html', icon: '🔀', level: 'Débutant', hours: '4h' },
        { id: '05-preload', label: 'Script Preload', href: 'pages/05-preload.html', icon: '🌉', level: 'Débutant', hours: '5h' },
        { id: '06-ipc', label: 'Communication IPC', href: 'pages/06-ipc.html', icon: '🔗', level: 'Débutant', hours: '6h' },
      ],
    },
    {
      title: 'Étape 3 — Construire',
      items: [
        { id: '07-plusieurs-pages', label: 'Plusieurs pages', href: 'pages/07-plusieurs-pages.html', icon: '📑', level: 'Inter.', hours: '6h' },
        { id: '08-menus', label: 'Menus & dialogues', href: 'pages/08-menus.html', icon: '🎛️', level: 'Inter.', hours: '5h' },
        { id: '09-fichiers', label: 'Ouvrir & sauvegarder', href: 'pages/09-fichiers.html', icon: '📁', level: 'Inter.', hours: '5h' },
      ],
    },
    {
      title: 'Étape 4 — Qualité',
      items: [
        { id: '10-securite', label: 'Sécurité officielle', href: 'pages/10-securite.html', icon: '🔒', level: 'Inter.', hours: '4h' },
        { id: '11-debugging', label: 'Déboguer', href: 'pages/11-debugging.html', icon: '🐛', level: 'Inter.', hours: '4h' },
        { id: '12-tests', label: 'Tests automatisés', href: 'pages/12-tests.html', icon: '✅', level: 'Inter.', hours: '6h' },
      ],
    },
    {
      title: 'Étape 5 — Distribuer',
      items: [
        { id: '13-packaging', label: '.exe · .dmg · AppImage', href: 'pages/13-packaging.html', icon: '📀', level: 'Avancé', hours: '6h' },
        { id: '14-publication', label: 'Publier & MAJ auto', href: 'pages/14-publication.html', icon: '🚢', level: 'Avancé', hours: '4h' },
      ],
    },
    {
      title: 'Projets guidés',
      items: [
        { id: 'projet-hello', label: 'Projet 1 — Hello Electron', href: 'pages/projet-hello.html', icon: '👋', level: 'Débutant', hours: '4h' },
        { id: 'projet-bloc-notes', label: 'Projet 2 — Bloc-notes', href: 'pages/projet-bloc-notes.html', icon: '📝', level: 'Inter.', hours: '10h' },
        { id: 'projet-complet', label: 'Projet 3 — App testée & compilée', href: 'pages/projet-complet.html', icon: '🏆', level: 'Avancé', hours: '15h' },
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
