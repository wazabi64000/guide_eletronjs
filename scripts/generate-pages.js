/**
 * Génère les pages HTML du cursus avec layout wazabiCode
 * Usage: node scripts/generate-pages.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'pages');

const PAGES = [
  { id: '02-html5', title: 'HTML5', level: 'Débutant', hours: '25h', desc: 'Balises, structure, formulaires, accessibilité, SEO, sémantique. Projets : CV, Landing page, Blog.' },
  { id: '03-css3', title: 'CSS3', level: 'Débutant', hours: '30h', desc: 'Sélecteurs, Box Model, Flexbox, Grid, responsive, animations, variables CSS. Projets : Portfolio, Dashboard, SaaS.' },
  { id: '04-javascript-debutant', title: 'JavaScript Débutant', level: 'Débutant', hours: '25h', desc: 'Variables, types, conditions, boucles, fonctions, tableaux, objets. Projets : Calculatrice, Convertisseur, Tasks.' },
  { id: '05-javascript-intermediaire', title: 'JavaScript Intermédiaire', level: 'Intermédiaire', hours: '30h', desc: 'DOM, Events, LocalStorage, JSON, Fetch. Projet : Gestionnaire de Notes.' },
  { id: '06-javascript-avance', title: 'JavaScript Avancé', level: 'Intermédiaire', hours: '35h', desc: 'ES6+, modules, classes, POO, async/await, promises, architecture. Projet : Application météo.' },
  { id: '07-sqlite', title: 'SQLite', level: 'Intermédiaire', hours: '20h', desc: 'Bases de données, tables, relations, CRUD, requêtes. Projet : Gestionnaire de contacts (better-sqlite3).' },
  { id: '08-nodejs', title: 'Node.js & API REST', level: 'Intermédiaire', hours: '25h', desc: 'Runtime, modules, Express, middleware, API REST. Projet : API Todo.' },
  { id: '09-electron', title: 'Electron.js', level: 'Avancé', hours: '30h', desc: 'Main Process, Renderer, Preload, IPC, sécurité. Projet : Bloc-notes Desktop.' },
  { id: '10-electron-sqlite', title: 'Electron + SQLite', level: 'Avancé', hours: '25h', desc: 'CRUD, recherche, filtres, persistance SQLite, architecture propre.' },
  { id: '11-electron-api', title: 'Electron + API REST', level: 'Avancé', hours: '30h', desc: 'Authentification, JWT, synchronisation API, gestion offline.' },
  { id: '12-debugging', title: 'Debugging', level: 'Avancé', hours: '15h', desc: 'Chrome DevTools, debugger, logs, performance, memory leaks. Exemples de bugs réels.' },
  { id: '13-tests', title: 'Tests (Jest, Playwright)', level: 'Expert', hours: '20h', desc: 'Tests unitaires, intégration, E2E avec Jest et Playwright.' },
  { id: '14-packaging', title: 'Packaging', level: 'Expert', hours: '15h', desc: 'EXE Windows, AppImage Linux, DMG macOS avec Electron Builder.' },
  { id: '15-deploiement', title: 'Déploiement & CI/CD', level: 'Expert', hours: '20h', desc: 'VPS, Docker, Nginx, HTTPS, pipelines CI/CD.' },
  { id: 'projet-notes', title: 'Projet — Gestionnaire de Notes', level: 'Débutant', hours: '15h', desc: 'Projet fil rouge : notes avec DOM, LocalStorage et Fetch.' },
  { id: 'projet-meteo', title: 'Projet — Application Météo', level: 'Intermédiaire', hours: '20h', desc: 'API météo, async/await, modules ES6, architecture modulaire.' },
  { id: 'projet-tasks', title: 'Projet — Tasks Electron + SQLite', level: 'Avancé', hours: '25h', desc: 'Gestionnaire de tâches desktop avec persistance locale.' },
  { id: 'projet-saas', title: 'Projet Expert — SaaS Desktop', level: 'Expert', hours: '60h', desc: 'Auth, SQLite, API REST, sync, paramètres, notifications, export PDF, dashboard.' },
];

function template({ id, title, level, hours, desc }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — wazabiCode</title>
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body data-page="${id}">

  <div id="page-content" class="course-content">
    <h1>${title}</h1>
    <div class="course-meta">
      <span class="course-meta__badge course-meta__badge--level">${level}</span>
      <span class="course-meta__badge">⏱ ${hours}</span>
    </div>

    <div class="alert alert--info">
      <strong>Module en cours de rédaction.</strong> Le contenu complet (théorie, exemples, exercices, corrections, quiz, challenge) sera ajouté progressivement. La structure pédagogique est en place.
    </div>

    <h2>1. Objectifs pédagogiques</h2>
    <p>${desc}</p>

    <h2>2. Théorie détaillée</h2>
    <p>Contenu à venir — section théorique complète avec schémas ASCII.</p>

    <h2>3. Exemples</h2>
    <p>Exemples simples, intermédiaires et avancés à venir.</p>

    <h2>4. Exercices & corrections</h2>
    <p>Exercices pratiques avec corrections détaillées à venir.</p>

    <h2>5. Quiz</h2>
    <div class="quiz-block">
      <h4>Quiz de validation — à compléter</h4>
      <p>Questions à choix multiples pour valider vos acquis avant le module suivant.</p>
    </div>

    <h2>6. Bonnes pratiques</h2>
    <p>Recommandations professionnelles spécifiques à ce module.</p>

    <h2>7. Erreurs fréquentes</h2>
    <p>Pièges courants et comment les éviter.</p>

    <h2>8. Challenge de fin de chapitre</h2>
    <p>Projet pratique pour consolider les acquis du module.</p>
  </div>

  <script src="../assets/js/navigation.js"></script>
  <script src="../assets/js/layout.js"></script>
  <script src="../assets/js/app.js"></script>
</body>
</html>
`;
}

for (const page of PAGES) {
  const filePath = path.join(pagesDir, `${page.id}.html`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template(page), 'utf-8');
    console.log('Created:', filePath);
  } else {
    console.log('Skipped (exists):', filePath);
  }
}

console.log('Done.');
