/**
 * Génère le cursus Electron.js — wazabiCode
 * Basé sur la documentation officielle : https://www.electronjs.org/fr/docs/latest/
 * Usage: node scripts/generate-pages.js --force
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'pages');
const force = process.argv.includes('--force');

const OFFICIAL = 'https://www.electronjs.org/fr/docs/latest';

const MODULES = [
  {
    file: '00-introduction', id: '00-introduction',
    title: 'Chapitre 0 — Qu\'est-ce qu\'Electron ?',
    level: 'Débutant', hours: '2h', prereq: 'HTML & JS de base',
    body: `
    <div class="alert alert--info">
      Référence : <a href="${OFFICIAL}/" target="_blank" rel="noopener">Documentation officielle Electron</a>
    </div>
    <h2>1. Objectifs</h2>
    <ul>
      <li>Comprendre ce qu'est une application Desktop Electron</li>
      <li>Savoir ce que vous allez construire dans ce cours</li>
      <li>Connaître les prérequis minimaux</li>
    </ul>
    <h2>2. Electron en une phrase</h2>
    <p><strong>Electron</strong> permet de créer une application installable (Windows, macOS, Linux) avec du <strong>HTML, CSS et JavaScript</strong>, comme un site web, mais dans sa propre fenêtre.</p>
    <p>Exemples : Visual Studio Code, Discord, Slack, Obsidian.</p>
    <h2>3. Les 3 fichiers minimum</h2>
    <div class="ascii-diagram">mon-app/
├── package.json    ← configuration npm
├── main.js         ← démarre l'app (Node.js)
└── index.html      ← votre première page (interface)</div>
    <h2>4. Ce que vous allez apprendre</h2>
    <ol>
      <li>Installer Electron avec <code>npm install electron --save-dev</code></li>
      <li>Créer votre première page HTML affichée dans une fenêtre</li>
      <li>Comprendre Main Process / Renderer Process</li>
      <li>Ajouter plusieurs pages, menus, sauvegarde de fichiers</li>
      <li>Tester votre application</li>
      <li>Compiler en <strong>.exe</strong> (Windows), <strong>.dmg</strong> (macOS), <strong>.AppImage</strong> (Linux)</li>
    </ol>
    <h2>5. Prérequis</h2>
    <ul>
      <li>Savoir écrire un fichier <code>index.html</code> basique</li>
      <li>Connaître <code>console.log()</code> en JavaScript</li>
      <li>Avoir Node.js installé (nous le vérifions au chapitre 1)</li>
    </ul>
    <h2>6. Quiz</h2>
    <div class="quiz-block"><h4>Q1. Electron sert à créer…</h4>
      <label class="quiz-option"><input type="radio" checked> Des applications Desktop ✓</label>
      <label class="quiz-option"><input type="radio"> Des sites WordPress</label>
    </div>`,
  },
  {
    file: '01-installation', id: '01-installation',
    title: 'Chapitre 1 — Installation officielle d\'Electron',
    level: 'Débutant', hours: '3h', prereq: 'Chapitre 0',
    body: `
    <div class="alert alert--info">
      📚 Source officielle :
      <a href="https://www.electronjs.org/fr/docs/latest/tutorial/installation" target="_blank" rel="noopener">
        Instructions d'installation avancée — Electron
      </a>
    </div>
    <h2>1. Objectifs</h2>
    <ul>
      <li>Installer Node.js et vérifier npm</li>
      <li>Installer Electron comme dépendance de développement</li>
      <li>Lancer Electron avec <code>npx electron .</code></li>
      <li>Résoudre les erreurs d'installation courantes</li>
    </ul>

    <h2>2. Installer Node.js</h2>
    <p>Téléchargez la version <strong>LTS</strong> sur <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a>, puis vérifiez :</p>
    <pre><code>node --version   # ex: v22.x.x
npm --version    # ex: 10.x.x</code></pre>

    <h2>3. Méthode officielle recommandée</h2>
    <p>La documentation Electron recommande d'installer Electron en <strong>dépendance de développement</strong> dans votre projet :</p>
    <pre><code>mkdir mon-app-electron
cd mon-app-electron
npm init -y
npm install electron --save-dev</code></pre>
    <p>Lors du <code>postinstall</code>, npm télécharge automatiquement le binaire Electron pour votre OS via <code>@electron/get</code>.</p>

    <h2>4. Exécution directe avec npx</h2>
    <p>Sans installer dans le projet, vous pouvez tester Electron ainsi :</p>
    <pre><code>npx electron .</code></pre>
    <p>Cette commande lance Electron dans le dossier courant. <em>Aucune dépendance de votre app n'est installée.</em></p>

    <h2>5. package.json minimal</h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^33.0.0"
  }
}</code></pre>
    <p>Le champ <code>"main"</code> indique le point d'entrée (Main Process). Lancez avec :</p>
    <pre><code>npm start</code></pre>

    <h2>6. Personnalisation (doc officielle)</h2>
    <table>
      <tr><th>Option</th><th>Commande</th></tr>
      <tr><td>Architecture x64 sur ARM</td><td><code>npm install --arch=x64 electron</code></td></tr>
      <tr><td>Plateforme Windows depuis Linux</td><td><code>npm install --platform=win32 electron</code></td></tr>
      <tr><td>Version alpha/beta</td><td><code>npm install electron@beta --save-dev</code></td></tr>
      <tr><td>Sans télécharger le binaire (CI)</td><td><code>ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install</code></td></tr>
    </table>

    <h2>7. Miroir (réseau lent ou Chine)</h2>
    <pre><code>export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm install electron --save-dev</code></pre>

    <h2>8. Résolution des problèmes (officiel)</h2>
    <table>
      <tr><th>Erreur</th><th>Cause probable</th><th>Solution</th></tr>
      <tr><td>ELIFECYCLE, ETIMEDOUT, ECONNRESET</td><td>Réseau</td><td>Réessayer, changer de réseau, miroir</td></tr>
      <tr><td>EACCESS</td><td>Droits npm</td><td>Corriger permissions npm</td></tr>
      <tr><td>Téléchargement bloqué</td><td>Proxy</td><td>Variable <code>ELECTRON_GET_USE_PROXY=1</code></td></tr>
    </table>
    <pre><code># Voir la progression du téléchargement
npm install --verbose electron</code></pre>

    <h2>9. Exercice</h2>
    <ol>
      <li>Créez le dossier <code>mon-app-electron</code></li>
      <li>Exécutez <code>npm init -y</code> puis <code>npm install electron --save-dev</code></li>
      <li>Vérifiez que <code>node_modules/electron</code> existe</li>
    </ol>

    <h2>10. Challenge</h2>
    <p>Installez Electron avec <code>--verbose</code> et notez où le binaire est mis en cache sur votre OS (voir doc : <code>~/.cache/electron/</code> sur Linux).</p>`,
  },
  {
    file: '02-premiere-page', id: '02-premiere-page',
    title: 'Chapitre 2 — Votre première page HTML',
    level: 'Débutant', hours: '3h', prereq: 'Chapitre 1',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Créer un fichier <code>index.html</code> from scratch</li>
      <li>Comprendre que l'interface Electron = pages web</li>
      <li>Préparer le contenu avant de connecter main.js</li>
    </ul>

    <h2>2. Créer index.html</h2>
    <p>Dans votre dossier <code>mon-app-electron</code>, créez :</p>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Ma première app Electron&lt;/title&gt;
  &lt;style&gt;
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      padding: 2rem;
      background: #1a1a2e;
      color: #eee;
    }
    h1 { color: #22d3ee; }
    button {
      padding: 0.75rem 1.5rem;
      background: #22d3ee;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Bienvenue dans Electron !&lt;/h1&gt;
  &lt;p&gt;Ceci est ma première page affichée dans une fenêtre Desktop.&lt;/p&gt;
  &lt;button id="btn"&gt;Cliquez-moi&lt;/button&gt;
  &lt;p id="message"&gt;&lt;/p&gt;
  &lt;script&gt;
    document.getElementById('btn').addEventListener('click', () =&gt; {
      document.getElementById('message').textContent =
        'Bravo ! Votre page JavaScript fonctionne.';
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

    <h2>3. Tester dans le navigateur (optionnel)</h2>
    <p>Ouvrez <code>index.html</code> dans Chrome pour vérifier le rendu. Ce n'est <em>pas</em> encore Electron, mais utile pour déboguer le HTML/CSS.</p>

    <h2>4. Structure actuelle</h2>
    <div class="ascii-diagram">mon-app-electron/
├── package.json
├── node_modules/
└── index.html        ← vous venez de créer ceci</div>

    <h2>5. Exercice</h2>
    <p>Personnalisez le titre, les couleurs et ajoutez un paragraphe « Créé avec wazabiCode ».</p>

    <h2>6. Prochaine étape</h2>
    <p>Au chapitre 3, nous créons <code>main.js</code> pour afficher cette page dans une vraie fenêtre Electron.</p>`,
  },
  {
    file: '03-main-js', id: '03-main-js',
    title: 'Chapitre 3 — Le fichier main.js',
    level: 'Débutant', hours: '4h', prereq: 'Chapitre 2',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Créer <code>main.js</code> ligne par ligne</li>
      <li>Ouvrir une fenêtre et charger <code>index.html</code></li>
      <li>Lancer l'app avec <code>npm start</code></li>
    </ul>

    <h2>2. main.js — version minimale</h2>
    <pre><code>// main.js — Point d'entrée Electron (Main Process)
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    title: 'Ma première app Electron',
  });

  // Charge index.html dans la fenêtre
  win.loadFile(path.join(__dirname, 'index.html'));
}

// Quand Electron est prêt, créer la fenêtre
app.whenReady().then(createWindow);

// Quitter sur Windows/Linux quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// macOS : recréer une fenêtre si l'utilisateur clique sur l'icône dock
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});</code></pre>

    <h2>3. Explication ligne par ligne</h2>
    <table>
      <tr><th>Ligne</th><th>Rôle</th></tr>
      <tr><td><code>require('electron')</code></td><td>Importe l'API Electron côté Node.js</td></tr>
      <tr><td><code>BrowserWindow</code></td><td>Crée une fenêtre avec Chromium intégré</td></tr>
      <tr><td><code>win.loadFile()</code></td><td>Affiche votre page HTML locale</td></tr>
      <tr><td><code>app.whenReady()</code></td><td>Attend qu'Electron soit initialisé</td></tr>
    </table>

    <h2>4. Mettre à jour package.json</h2>
    <pre><code>"main": "main.js",
"scripts": {
  "start": "electron ."
}</code></pre>

    <h2>5. Lancer !</h2>
    <pre><code>npm start</code></pre>
    <p>🎉 Votre première application Desktop s'ouvre !</p>

    <h2>6. DevTools</h2>
    <p>Dans la fenêtre : <code>Ctrl+Shift+I</code> (Windows/Linux) ou <code>Cmd+Option+I</code> (macOS) pour ouvrir les outils de développement Chrome.</p>

    <h2>7. Exercice</h2>
    <p>Changez la taille de la fenêtre à 1200×800 et modifiez le titre.</p>

    <h2>8. Erreurs fréquentes</h2>
    <div class="alert alert--warning">
      <strong>Cannot find module 'electron'</strong> → Exécutez <code>npm install electron --save-dev</code><br>
      <strong>Page blanche</strong> → Vérifiez le chemin vers <code>index.html</code>
    </div>`,
  },
  {
    file: '04-processus', id: '04-processus',
    title: 'Chapitre 4 — Main Process & Renderer Process',
    level: 'Débutant', hours: '4h', prereq: 'Chapitre 3',
    body: `
    <div class="alert alert--info">
      📚 <a href="${OFFICIAL}/tutorial/process-model" target="_blank" rel="noopener">Modèle de processus — Electron</a>
    </div>
    <h2>1. Objectifs</h2>
    <ul>
      <li>Comprendre la différence Main / Renderer</li>
      <li>Savoir quel code va où</li>
    </ul>

    <h2>2. Schéma officiel</h2>
    <div class="ascii-diagram">┌──────────────── MAIN PROCESS ────────────────┐
│  main.js — Node.js complet                    │
│  • Crée les fenêtres                          │
│  • Accès fichiers, base de données            │
│  • Un seul Main Process par application       │
└───────────────────────┬───────────────────────┘
                        │ crée
                        ▼
┌──────────────── RENDERER PROCESS ──────────────┐
│  index.html + JavaScript — comme dans Chrome  │
│  • Affiche l'interface utilisateur            │
│  • Un Renderer par fenêtre / onglet           │
│  • PAS d'accès Node.js direct (sécurité)      │
└──────────────────────────────────────────────┘</div>

    <h2>3. Où mettre mon code ?</h2>
    <table>
      <tr><th>Besoin</th><th>Fichier</th><th>Processus</th></tr>
      <tr><td>Créer une fenêtre</td><td>main.js</td><td>Main</td></tr>
      <tr><td>Style CSS, boutons</td><td>index.html</td><td>Renderer</td></tr>
      <tr><td>Lire un fichier disque</td><td>main.js</td><td>Main</td></tr>
      <tr><td>Réagir au clic utilisateur</td><td>renderer.js ou &lt;script&gt;</td><td>Renderer</td></tr>
    </table>

    <h2>4. Exercice</h2>
    <p>Ajoutez dans <code>index.html</code> un script qui affiche <code>navigator.userAgent</code> — observez que c'est Chromium.</p>

    <h2>5. Quiz</h2>
    <div class="quiz-block"><h4>main.js s'exécute dans…</h4>
      <label class="quiz-option"><input type="radio" checked> Le Main Process (Node.js) ✓</label>
      <label class="quiz-option"><input type="radio"> Le Renderer (navigateur)</label>
    </div>`,
  },
  {
    file: '05-preload', id: '05-preload',
    title: 'Chapitre 5 — Script Preload & contextBridge',
    level: 'Débutant', hours: '5h', prereq: 'Chapitre 4',
    body: `
    <div class="alert alert--info">
      📚 <a href="${OFFICIAL}/tutorial/tutorial-preload" target="_blank" rel="noopener">Preload scripts — Electron</a>
    </div>
    <h2>1. Objectifs</h2>
    <ul>
      <li>Créer <code>preload.js</code></li>
      <li>Exposer une API sécurisée au Renderer via <code>contextBridge</code></li>
    </ul>

    <h2>2. preload.js</h2>
    <pre><code>// preload.js — Pont entre Main et Renderer
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
});</code></pre>

    <h2>3. Configurer main.js</h2>
    <pre><code>const win = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,    // Obligatoire (sécurité)
    nodeIntegration: false,    // Obligatoire (sécurité)
  },
});</code></pre>

    <h2>4. Utiliser dans index.html</h2>
    <pre><code>&lt;script&gt;
  document.body.innerHTML += \`&lt;p&gt;Electron \${window.electronAPI.versions.electron}&lt;/p&gt;\`;
&lt;/script&gt;</code></pre>

    <h2>5. Exercice</h2>
    <p>Affichez la plateforme (<code>win32</code>, <code>linux</code>, <code>darwin</code>) dans votre page.</p>`,
  },
  {
    file: '06-ipc', id: '06-ipc',
    title: 'Chapitre 6 — Communication IPC',
    level: 'Débutant', hours: '6h', prereq: 'Chapitre 5',
    body: `
    <div class="alert alert--info">
      📚 <a href="${OFFICIAL}/tutorial/ipc" target="_blank" rel="noopener">Inter-Process Communication — Electron</a>
    </div>
    <h2>1. Objectifs</h2>
    <ul>
      <li>Envoyer un message du Renderer vers le Main</li>
      <li>Recevoir une réponse avec <code>invoke</code> / <code>handle</code></li>
    </ul>

    <h2>2. preload.js</h2>
    <pre><code>const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sauvegarder: (texte) => ipcRenderer.invoke('save-text', texte),
  lire: () => ipcRenderer.invoke('read-text'),
});</code></pre>

    <h2>3. main.js</h2>
    <pre><code>const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const fichier = path.join(app.getPath('userData'), 'notes.txt');

ipcMain.handle('save-text', (_event, texte) => {
  fs.writeFileSync(fichier, texte, 'utf-8');
  return { ok: true };
});

ipcMain.handle('read-text', () => {
  if (fs.existsSync(fichier)) return fs.readFileSync(fichier, 'utf-8');
  return '';
});</code></pre>

    <h2>4. index.html</h2>
    <pre><code>&lt;textarea id="editor"&gt;&lt;/textarea&gt;
&lt;button id="save"&gt;Sauvegarder&lt;/button&gt;
&lt;script&gt;
  const editor = document.getElementById('editor');
  window.api.lire().then(t => editor.value = t);
  document.getElementById('save').onclick = () =>
    window.api.sauvegarder(editor.value);
&lt;/script&gt;</code></pre>

    <h2>5. Schéma IPC</h2>
    <div class="ascii-diagram">Renderer  →  window.api.save()  →  preload  →  ipcRenderer.invoke
  →  Main ipcMain.handle  →  fs.writeFile  →  retour { ok: true }</div>

    <h2>6. Challenge</h2>
    <p>Bloc-notes minimal fonctionnel avec sauvegarde automatique au clic.</p>`,
  },
  {
    file: '07-plusieurs-pages', id: '07-plusieurs-pages',
    title: 'Chapitre 7 — Plusieurs pages dans l\'application',
    level: 'Intermédiaire', hours: '6h', prereq: 'Chapitre 6',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Gérer plusieurs fichiers HTML (accueil, paramètres, à propos)</li>
      <li>Naviguer entre les pages</li>
      <li>Option : plusieurs fenêtres</li>
    </ul>

    <h2>2. Structure multi-pages</h2>
    <div class="ascii-diagram">mon-app-electron/
├── main.js
├── preload.js
├── pages/
│   ├── accueil.html
│   ├── parametres.html
│   └── apropos.html
├── css/style.css
└── js/navigation.js</div>

    <h2>3. Navigation simple (méthode débutant)</h2>
  <pre><code>// js/navigation.js (Renderer)
function allerVers(page) {
  window.location.href = \`pages/\${page}.html\`;
}</code></pre>
    <pre><code>&lt;!-- pages/accueil.html --&gt;
&lt;nav&gt;
  &lt;button onclick="allerVers('parametres')"&gt;Paramètres&lt;/button&gt;
  &lt;button onclick="allerVers('apropos')"&gt;À propos&lt;/button&gt;
&lt;/nav&gt;</code></pre>

    <h2>4. Charger une autre page depuis main.js</h2>
    <pre><code>win.loadFile(path.join(__dirname, 'pages', 'accueil.html'));</code></pre>

    <h2>5. Plusieurs fenêtres (option)</h2>
    <pre><code>function ouvrirParametres() {
  const win = new BrowserWindow({ width: 500, height: 400, parent: mainWindow });
  win.loadFile('pages/parametres.html');
}</code></pre>

    <h2>6. Exercice</h2>
    <p>Créez 3 pages : Accueil, Paramètres (choix thème clair/sombre), À propos (version app).</p>`,
  },
  {
    file: '08-menus', id: '08-menus',
    title: 'Chapitre 8 — Menus & boîtes de dialogue',
    level: 'Intermédiaire', hours: '5h', prereq: 'Chapitre 7',
    body: `
    <div class="alert alert--info">
      📚 <a href="${OFFICIAL}/tutorial/application-menu" target="_blank" rel="noopener">Menu d'application — Electron</a>
    </div>
    <h2>1. Menu natif</h2>
    <pre><code>const { Menu } = require('electron');

const template = [
  {
    label: 'Fichier',
    submenu: [
      { label: 'Nouveau', accelerator: 'CmdOrCtrl+N', click: () => createWindow() },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },
  {
    label: 'Aide',
    submenu: [{ label: 'À propos', click: () => ouvrirApropos() }],
  },
];
Menu.setApplicationMenu(Menu.buildFromTemplate(template));</code></pre>

    <h2>2. Boîte de dialogue</h2>
    <pre><code>const { dialog } = require('electron');

const { response } = await dialog.showMessageBox({
  type: 'question',
  buttons: ['Oui', 'Non'],
  message: 'Enregistrer avant de quitter ?',
});</code></pre>

    <h2>3. Exercice</h2>
    <p>Menu Fichier → Quitter avec confirmation si texte non sauvegardé.</p>`,
  },
  {
    file: '09-fichiers', id: '09-fichiers',
    title: 'Chapitre 9 — Ouvrir & enregistrer des fichiers',
    level: 'Intermédiaire', hours: '5h', prereq: 'Chapitre 8',
    body: `
    <h2>1. Dialog Ouvrir / Enregistrer</h2>
    <pre><code>const { dialog } = require('electron');

ipcMain.handle('dialog:open', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Texte', extensions: ['txt', 'md'] }],
  });
  if (canceled) return null;
  return fs.readFileSync(filePaths[0], 'utf-8');
});

ipcMain.handle('dialog:save', async (_e, contenu) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [{ name: 'Texte', extensions: ['txt'] }],
  });
  if (canceled) return false;
  fs.writeFileSync(filePath, contenu, 'utf-8');
  return true;
});</code></pre>

    <h2>2. preload.js</h2>
    <pre><code>contextBridge.exposeInMainWorld('api', {
  ouvrir: () => ipcRenderer.invoke('dialog:open'),
  enregistrer: (c) => ipcRenderer.invoke('dialog:save', c),
});</code></pre>

    <h2>3. Challenge</h2>
    <p>Éditeur texte complet : Nouveau, Ouvrir, Enregistrer via menu + raccourcis clavier.</p>`,
  },
  {
    file: '10-securite', id: '10-securite',
    title: 'Chapitre 10 — Sécurité (checklist officielle)',
    level: 'Intermédiaire', hours: '4h', prereq: 'Chapitre 9',
    body: `
    <div class="alert alert--info">
      📚 <a href="${OFFICIAL}/tutorial/security" target="_blank" rel="noopener">Sécurité — Electron</a>
    </div>
    <h2>1. Checklist obligatoire</h2>
    <table>
      <tr><th>Règle</th><th>Valeur</th></tr>
      <tr><td>nodeIntegration</td><td><code>false</code></td></tr>
      <tr><td>contextIsolation</td><td><code>true</code></td></tr>
      <tr><td>sandbox</td><td><code>true</code> (recommandé)</td></tr>
      <tr><td>Contenu distant</td><td>Éviter ou CSP strict</td></tr>
    </table>

    <h2>2. Content Security Policy</h2>
    <pre><code>&lt;meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"&gt;</code></pre>

    <h2>3. Ne jamais faire</h2>
    <div class="alert alert--warning">
      ❌ <code>nodeIntegration: true</code> + contenu HTML non fiable = faille critique<br>
      ❌ Exécuter du SQL ou des commandes shell envoyées par le Renderer sans validation
    </div>`,
  },
  {
    file: '11-debugging', id: '11-debugging',
    title: 'Chapitre 11 — Déboguer son application',
    level: 'Intermédiaire', hours: '4h', prereq: 'Chapitre 10',
    body: `
    <h2>1. Renderer — DevTools</h2>
    <pre><code>mainWindow.webContents.openDevTools(); // mode dev uniquement</code></pre>

    <h2>2. Main Process — VS Code</h2>
    <pre><code>// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Debug Electron",
    "type": "node",
    "request": "launch",
    "cwd": "\${workspaceFolder}",
    "runtimeExecutable": "\${workspaceFolder}/node_modules/.bin/electron",
    "args": ["."],
    "outputCapture": "std"
  }]
}</code></pre>

    <h2>3. Logs</h2>
    <pre><code>npm install electron-log --save
// main.js
const log = require('electron-log');
log.info('Application démarrée');</code></pre>`,
  },
  {
    file: '12-tests', id: '12-tests',
    title: 'Chapitre 12 — Tests automatisés',
    level: 'Intermédiaire', hours: '6h', prereq: 'Chapitre 11',
    body: `
    <h2>1. Objectifs</h2>
    <p>Tester <strong>avant</strong> de compiler en .exe / .dmg. Deux niveaux : unitaires et E2E.</p>

    <h2>2. Tests unitaires — Jest</h2>
    <pre><code>npm install jest --save-dev

// utils/format.js
export function formaterTitre(t) { return t.trim() || 'Sans titre'; }

// utils/format.test.js
import { formaterTitre } from './format.js';
test('titre vide', () => expect(formaterTitre('')).toBe('Sans titre'));</code></pre>
    <pre><code>// package.json
"scripts": { "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js" }</code></pre>

    <h2>3. Tests E2E — Playwright</h2>
    <pre><code>npm install @playwright/test --save-dev
npx playwright install</code></pre>
    <pre><code>// tests/electron.spec.js
const { test, expect, _electron: electron } = require('@playwright/test');

test('fenêtre principale', async () => {
  const app = await electron.launch({ args: ['.'] });
  const window = await app.firstWindow();
  await expect(window).toHaveTitle(/Ma première app/);
  await window.click('#btn');
  await expect(window.locator('#message')).not.toBeEmpty();
  await app.close();
});</code></pre>

    <h2>4. Lancer les tests</h2>
    <pre><code>npm test
npx playwright test</code></pre>

    <h2>5. Challenge</h2>
    <p>Écrivez 3 tests unitaires + 1 test E2E qui vérifie le bouton de votre page d'accueil.</p>`,
  },
  {
    file: '13-packaging', id: '13-packaging',
    title: 'Chapitre 13 — Compiler en .exe · .dmg · AppImage',
    level: 'Avancé', hours: '6h', prereq: 'Chapitre 12 (tests OK)',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Installer <strong>electron-builder</strong></li>
      <li>Générer un installateur Windows (.exe), macOS (.dmg), Linux (.AppImage)</li>
    </ul>

    <h2>2. Installation</h2>
    <pre><code>npm install electron-builder --save-dev</code></pre>

    <h2>3. package.json</h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "main": "main.js",
  "author": "wazabiCode",
  "scripts": {
    "start": "electron .",
    "test": "jest",
    "dist": "electron-builder",
    "dist:win": "electron-builder --win",
    "dist:mac": "electron-builder --mac",
    "dist:linux": "electron-builder --linux"
  },
  "build": {
    "appId": "com.wazabicode.monapp",
    "productName": "Mon App Electron",
    "directories": { "output": "dist" },
    "files": ["**/*", "!tests/**", "!dist/**"],
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "assets/icon.icns"
    },
    "linux": {
      "target": "AppImage",
      "icon": "assets/icon.png"
    }
  }
}</code></pre>

    <h2>4. Workflow recommandé</h2>
    <div class="ascii-diagram">1. npm test          ← tests passent
2. npm start           ← test manuel
3. npm run dist        ← génère dist/
4. Installer et tester le .exe / .dmg / .AppImage</div>

    <h2>5. Commandes</h2>
    <pre><code>npm run dist         # OS actuel
npm run dist:win     # Windows (depuis n'importe quel OS avec Wine si Linux)
npm run dist:mac     # macOS (nécessite un Mac pour signer)
npm run dist:linux   # Linux AppImage</code></pre>

    <h2>6. Résultat dans dist/</h2>
    <table>
      <tr><th>OS</th><th>Fichier généré</th></tr>
      <tr><td>Windows</td><td><code>Mon App Setup 1.0.0.exe</code></td></tr>
      <tr><td>macOS</td><td><code>Mon App-1.0.0.dmg</code></td></tr>
      <tr><td>Linux</td><td><code>Mon App-1.0.0.AppImage</code></td></tr>
    </table>

    <h2>7. Exercice</h2>
    <p>Ajoutez une icône dans <code>assets/</code>, lancez <code>npm run dist</code>, installez votre propre application.</p>`,
  },
  {
    file: '14-publication', id: '14-publication',
    title: 'Chapitre 14 — Publier & mises à jour automatiques',
    level: 'Avancé', hours: '4h', prereq: 'Chapitre 13',
    body: `
    <h2>1. Publier sur GitHub Releases</h2>
    <pre><code>npm install electron-updater --save

// main.js
const { autoUpdater } = require('electron-updater');
app.whenReady().then(() => autoUpdater.checkForUpdatesAndNotify());</code></pre>

    <h2>2. CI/CD simplifié (GitHub Actions)</h2>
    <pre><code># .github/workflows/build.yml
name: Build
on:
  push:
    tags: ['v*']
jobs:
  build:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm test
      - run: npm run dist
      - uses: softprops/action-gh-release@v2
        with:
          files: dist/*</code></pre>

    <h2>3. Checklist publication</h2>
    <ul>
      <li>✅ Tests passent</li>
      <li>✅ Version incrémentée dans package.json</li>
      <li>✅ Icônes présentes</li>
      <li>✅ README avec captures d'écran</li>
      <li>✅ Tag Git <code>v1.0.0</code> → build automatique</li>
    </ul>`,
  },
];

const PROJECTS = [
  {
    file: 'projet-hello', id: 'projet-hello',
    title: 'Projet 1 — Hello Electron (packagé)',
    level: 'Débutant', hours: '4h', prereq: 'Chapitres 1 à 3',
    body: `
    <h2>Objectif</h2>
    <p>Application minimale : une page, un bouton, compilée en installateur.</p>
    <h2>Étapes</h2>
    <ol>
      <li><code>npm install electron --save-dev</code></li>
      <li>Créer index.html + main.js</li>
      <li><code>npm start</code> — vérifier</li>
      <li><code>npm run dist</code> — obtenir l'installateur</li>
    </ol>
    <h2>Livrable</h2>
    <p>Dossier <code>dist/</code> avec l'installateur + capture d'écran.</p>`,
  },
  {
    file: 'projet-bloc-notes', id: 'projet-bloc-notes',
    title: 'Projet 2 — Bloc-notes multi-pages',
    level: 'Intermédiaire', hours: '10h', prereq: 'Chapitres 4 à 9',
    body: `
    <h2>Objectif</h2>
    <p>Éditeur texte avec 3 pages, IPC, menus Fichier, Ouvrir/Enregistrer.</p>
    <h2>Fonctionnalités</h2>
    <ul>
      <li>pages/accueil.html, parametres.html, apropos.html</li>
      <li>preload + IPC sauvegarde</li>
      <li>Menu natif + dialog</li>
      <li>Tests E2E du bouton Sauvegarder</li>
    </ul>`,
  },
  {
    file: 'projet-complet', id: 'projet-complet',
    title: 'Projet 3 — Application testée & compilée',
    level: 'Avancé', hours: '15h', prereq: 'Tous les chapitres',
    body: `
    <h2>Objectif final du cursus</h2>
    <p>Livrable professionnel : app Electron complète, testée, packagée sur 3 OS.</p>
    <h2>Checklist</h2>
    <ul>
      <li>☐ Structure propre (main, preload, pages/, assets/)</li>
      <li>☐ Sécurité : contextIsolation, pas de nodeIntegration</li>
      <li>☐ Multi-pages avec navigation</li>
      <li>☐ Menus + dialogs fichiers</li>
      <li>☐ ≥ 5 tests Jest + 2 tests Playwright</li>
      <li>☐ <code>npm run dist</code> → .exe ou .AppImage ou .dmg</li>
      <li>☐ README installation pour l'utilisateur final</li>
    </ul>
    <div class="ascii-diagram">PARCOURS COMPLET :
Zéro → npm install electron → première page → main.js
→ preload/IPC → multi-pages → menus/fichiers
→ sécurité → tests → electron-builder → installateur</div>`,
  },
];

function pageTemplate({ id, title, level, hours, prereq, body }) {
  const prereqHtml = prereq ? `<span class="course-meta__badge">Prérequis : ${prereq}</span>` : '';
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
      ${prereqHtml}
    </div>
    ${body}
  </div>
  <script src="../assets/js/navigation.js"></script>
  <script src="../assets/js/layout.js"></script>
  <script src="../assets/js/app.js"></script>
</body>
</html>`;
}

// Supprimer les anciennes pages
const KEEP = new Set([...MODULES, ...PROJECTS].map((m) => `${m.file}.html`));
for (const f of fs.readdirSync(pagesDir)) {
  if (f.endsWith('.html') && !KEEP.has(f)) {
    fs.unlinkSync(path.join(pagesDir, f));
    console.log('Deleted:', f);
  }
}

for (const mod of [...MODULES, ...PROJECTS]) {
  const filePath = path.join(pagesDir, `${mod.file}.html`);
  fs.writeFileSync(filePath, pageTemplate(mod), 'utf-8');
  console.log('Written:', mod.file);
}

console.log('Done.');
