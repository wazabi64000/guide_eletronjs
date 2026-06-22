/**
 * Génère toutes les pages HTML du cursus Electron.js — wazabiCode
 * Usage: node scripts/generate-pages.js [--force]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'pages');
const force = process.argv.includes('--force');

const MODULES = [
  {
    file: '00-introduction',
    id: '00-introduction',
    title: 'Chapitre 0 — Introduction à Electron.js',
    level: 'Débutant',
    hours: '4h',
    prereq: 'Bases HTML, CSS, JavaScript',
    body: `
    <h2>1. Objectifs pédagogiques</h2>
    <ul>
      <li>Comprendre ce qu'est Electron et pourquoi l'utiliser</li>
      <li>Distinguer application Web et application Desktop</li>
      <li>Maîtriser l'architecture Main Process / Renderer / Preload</li>
      <li>Comparer Electron avec Tauri, Flutter et Neutralino</li>
      <li>Savoir quand choisir Electron pour un projet</li>
    </ul>

    <h2>2. Théorie — Qu'est-ce qu'Electron ?</h2>
    <p><strong>Electron</strong> est un framework open source (GitHub, 2013) qui permet de créer des applications Desktop avec les technologies Web. Il embarque <strong>Chromium</strong> (moteur de rendu) et <strong>Node.js</strong> (accès système) dans un seul exécutable.</p>
    <p>Applications célèbres : VS Code, Slack, Discord, Notion Desktop, Obsidian, Figma Desktop.</p>

    <div class="ascii-diagram">┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION ELECTRON                          │
│  ┌──────────────────────┐    ┌──────────────────────────────┐   │
│  │    MAIN PROCESS      │    │     RENDERER PROCESS(ES)     │   │
│  │    (Node.js)         │◀──▶│     (Chromium)               │   │
│  │  • app, BrowserWindow│ IPC│  • Votre HTML/CSS/JS (UI)    │   │
│  │  • ipcMain, fs, sql  │    │  • Pas de Node.js direct     │   │
│  └──────────────────────┘    └──────────────────────────────┘   │
│              └────────── PRELOAD (contextBridge) ──────────┘    │
└─────────────────────────────────────────────────────────────────┘</div>

    <h3>Main Process</h3>
    <p>Point d'entrée <code>main.js</code>. Un seul par app. Gère fenêtres, menus, cycle de vie, accès fichiers et base de données.</p>

    <h3>Renderer Process</h3>
    <p>Un par fenêtre. Affiche votre interface HTML/CSS/JS. Communique avec le Main via IPC uniquement.</p>

    <h3>Preload Script</h3>
    <p>Pont sécurisé exécuté avant la page. Expose une API limitée via <code>contextBridge.exposeInMainWorld()</code>.</p>

    <h2>3. Web vs Desktop</h2>
    <table>
      <tr><th>Web</th><th>Desktop Electron</th></tr>
      <tr><td>Navigateur requis</td><td>Installateur .exe / .dmg / .AppImage</td></tr>
      <tr><td>Sandbox navigateur</td><td>Accès fichiers, SQLite, notifications OS</td></tr>
      <tr><td>Mise à jour serveur</td><td>electron-updater</td></tr>
    </table>

    <h2>4. Comparaisons</h2>
    <table>
      <tr><th>Critère</th><th>Electron</th><th>Tauri</th><th>Flutter</th></tr>
      <tr><td>UI</td><td>HTML/CSS/JS</td><td>WebView native</td><td>Dart/widgets</td></tr>
      <tr><td>Taille</td><td>~150 Mo+</td><td>~5–15 Mo</td><td>~30 Mo</td></tr>
      <tr><td>Backend</td><td>Node.js</td><td>Rust</td><td>Dart</td></tr>
      <tr><td>Écosystème npm</td><td>Complet</td><td>Partiel</td><td>Pub.dev</td></tr>
    </table>

    <h2>5. Exemple simple</h2>
    <pre><code>// main.js
import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(import.meta.dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile('index.html');
};
app.whenReady().then(createWindow);</code></pre>

    <h2>6. Exercices</h2>
    <div class="quiz-block"><h4>Exercice 1</h4><p>Listez 3 apps Electron que vous utilisez et identifiez leur cas d'usage Desktop.</p></div>

    <h2>7. Quiz</h2>
    <div class="quiz-block"><h4>Q1. Electron combine ?</h4>
      <label class="quiz-option"><input type="radio" name="q1" checked> Chromium + Node.js ✓</label>
      <label class="quiz-option"><input type="radio" name="q1"> Firefox + Python</label>
    </div>

    <h2>8. Bonnes pratiques</h2>
    <ul><li><code>contextIsolation: true</code> toujours</li><li><code>nodeIntegration: false</code> dans le renderer</li><li>Logique système dans le Main, UI dans le Renderer</li></ul>

    <h2>9. Erreurs fréquentes</h2>
    <div class="alert alert--warning"><strong>nodeIntegration: true</strong> → failles XSS. Utilisez Preload.</div>

    <h2>10. Challenge</h2>
    <p>Rédigez un ADR (Architecture Decision Record) justifiant Electron pour une app de gestion de factures offline.</p>`,
  },
  {
    file: '01-installation',
    id: '01-installation',
    title: 'Module 1 — Environnement de développement Electron',
    level: 'Débutant',
    hours: '6h',
    prereq: 'Chapitre 0',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Installer Node.js LTS, VS Code, Git et Chrome</li>
      <li>Configurer un projet Electron avec npm</li>
      <li>Comprendre package.json, scripts et structure Electron</li>
      <li>Lancer electron-quick-start</li>
    </ul>

    <h2>2. Outils requis</h2>
    <table>
      <tr><th>Outil</th><th>Rôle pour Electron</th></tr>
      <tr><td>Node.js LTS</td><td>Runtime + npm, base d'Electron</td></tr>
      <tr><td>VS Code</td><td>Éditeur, debug Electron</td></tr>
      <tr><td>Git</td><td>Versionnement du projet</td></tr>
      <tr><td>Chrome DevTools</td><td>Debug du Renderer (Chromium)</td></tr>
    </table>

    <h2>3. Vérification</h2>
    <pre><code>node --version    # v22+
npm --version     # 10+
git --version</code></pre>

    <h2>4. Premier projet Electron</h2>
    <pre><code>mkdir mon-app-electron && cd mon-app-electron
npm init -y
npm install electron --save-dev</code></pre>

    <h2>5. package.json Electron</h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "start": "electron .",
    "dev": "electron . --enable-logging"
  },
  "devDependencies": {
    "electron": "^33.0.0"
  }
}</code></pre>

    <h2>6. Structure projet</h2>
    <div class="ascii-diagram">mon-app-electron/
├── main.js           # Main Process
├── preload.js        # Pont sécurisé
├── index.html        # UI Renderer
├── renderer.js       # Logique UI
├── package.json
└── assets/           # Icônes, images</div>

    <h2>7. Extensions VS Code</h2>
    <ul><li>ESLint, Prettier, GitLens</li><li>Electron Debug (optionnel)</li></ul>

    <h2>8. Exercice</h2>
    <p>Clonez <code>electron/electron-quick-start</code>, lancez <code>npm start</code>, ouvrez DevTools (Ctrl+Shift+I).</p>

    <h2>9. Challenge</h2>
    <p>Créez un projet from scratch, affichez « Hello wazabiCode » dans une fenêtre 800×600.</p>`,
  },
  {
    file: '02-premiers-pas',
    id: '02-premiers-pas',
    title: 'Module 2 — Premiers pas avec Electron',
    level: 'Débutant',
    hours: '10h',
    prereq: 'Module 1',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Créer une app Electron complète (main, preload, renderer)</li>
      <li>Comprendre le cycle de vie <code>app</code></li>
      <li>Charger du HTML local et des assets</li>
      <li>Configurer webPreferences correctement</li>
    </ul>

    <h2>2. main.js complet</h2>
    <pre><code>import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: 'Mon App Electron',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});</code></pre>

    <h2>3. preload.js</h2>
    <pre><code>import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
});</code></pre>

    <h2>4. index.html + renderer.js</h2>
    <pre><code>&lt;!-- index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;&lt;meta charset="UTF-8"&gt;&lt;title&gt;Mon App&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Bienvenue dans Electron&lt;/h1&gt;
  &lt;p id="info"&gt;&lt;/p&gt;
  &lt;script src="renderer.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    <pre><code>// renderer.js
document.getElementById('info').textContent =
  \`Plateforme: \${window.electronAPI.platform} | Electron \${window.electronAPI.versions.electron}\`;</code></pre>

    <h2>5. Schéma flux de démarrage</h2>
    <div class="ascii-diagram">npm start → Node lance main.js → app.whenReady()
  → new BrowserWindow → preload.js → index.html → renderer.js</div>

    <h2>6. Exercice</h2>
    <p>Ajoutez un bouton qui affiche la version de Chrome dans l'interface.</p>

    <h2>7. Challenge</h2>
    <p>Créez une fenêtre avec logo, titre personnalisé et fond CSS. Versionnez avec Git.</p>`,
  },
  {
    file: '03-fenetres',
    id: '03-fenetres',
    title: 'Module 3 — Fenêtres & cycle de vie',
    level: 'Débutant',
    hours: '8h',
    prereq: 'Module 2',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Maîtriser BrowserWindow (options, événements)</li>
      <li>Gérer plusieurs fenêtres</li>
      <li>Comprendre les événements app (ready, quit, activate)</li>
      <li>fenêtre frameless, taille min/max, centre écran</li>
    </ul>

    <h2>2. Options BrowserWindow</h2>
    <pre><code>new BrowserWindow({
  width: 1200, height: 800,
  minWidth: 800, minHeight: 600,
  center: true,
  show: false,              // Afficher après ready-to-show
  titleBarStyle: 'hidden',   // macOS
  frame: true,
  icon: path.join(__dirname, 'assets/icon.png'),
  webPreferences: { /* ... */ },
});

win.once('ready-to-show', () => win.show());</code></pre>

    <h2>3. Événements fenêtre</h2>
    <table>
      <tr><th>Événement</th><th>Description</th></tr>
      <tr><td>close</td><td>Avant fermeture (peut être annulé)</td></tr>
      <tr><td>closed</td><td>Fenêtre détruite</td></tr>
      <tr><td>focus / blur</td><td>Focus clavier</td></tr>
      <tr><td>resize / move</td><td>Redimensionnement / déplacement</td></tr>
    </table>

    <h2>4. Multi-fenêtres</h2>
    <pre><code>const windows = new Map();

function createEditorWindow(filePath) {
  const win = new BrowserWindow({ /* ... */ });
  windows.set(win.id, win);
  win.on('closed', () => windows.delete(win.id));
  win.loadFile('editor.html', { query: { file: filePath } });
}</code></pre>

    <h2>5. Exercice</h2>
    <p>Implémentez Cmd+N / Ctrl+N pour ouvrir une nouvelle fenêtre.</p>

    <h2>6. Challenge</h2>
    <p>App avec fenêtre principale + fenêtre « À propos » modale.</p>`,
  },
  {
    file: '04-preload-ipc',
    id: '04-preload-ipc',
    title: 'Module 4 — Preload & IPC',
    level: 'Intermédiaire',
    hours: '12h',
    prereq: 'Module 3',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Maîtriser ipcMain, ipcRenderer, ipcMain.handle</li>
      <li>Exposer une API typée via contextBridge</li>
      <li>Communication bidirectionnelle Main ↔ Renderer</li>
    </ul>

    <h2>2. Schéma IPC</h2>
    <div class="ascii-diagram">Renderer                Preload                  Main
   │                        │                       │
   │ window.api.save()      │                       │
   │───────────────────────▶│ ipcRenderer.invoke    │
   │                        │──────────────────────▶│ ipcMain.handle
   │                        │◀──────────────────────│ return result
   │◀───────────────────────│                       │</div>

    <h2>3. preload.js</h2>
    <pre><code>import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  saveFile: (content) => ipcRenderer.invoke('file:save', content),
  readFile: (path) => ipcRenderer.invoke('file:read', path),
  onThemeChange: (callback) => {
    ipcRenderer.on('theme:changed', (_e, theme) => callback(theme));
  },
});</code></pre>

    <h2>4. main.js handlers</h2>
    <pre><code>import { ipcMain } from 'electron';
import fs from 'node:fs/promises';

ipcMain.handle('file:save', async (_event, content) => {
  await fs.writeFile('notes.txt', content, 'utf-8');
  return { success: true };
});

ipcMain.handle('file:read', async (_event, filePath) => {
  return fs.readFile(filePath, 'utf-8');
});</code></pre>

    <h2>5. renderer.js</h2>
    <pre><code>document.getElementById('save').addEventListener('click', async () => {
  const content = document.getElementById('editor').value;
  const result = await window.api.saveFile(content);
  if (result.success) alert('Sauvegardé !');
});</code></pre>

    <h2>6. invoke vs send/on</h2>
    <table>
      <tr><th>Pattern</th><th>Usage</th></tr>
      <tr><td>invoke / handle</td><td>Requête-réponse (async, retour valeur)</td></tr>
      <tr><td>send / on</td><td>Événements one-way (notifications)</td></tr>
    </table>

    <h2>7. Challenge</h2>
    <p>Bloc-notes : zone texte + bouton Sauvegarder via IPC vers le Main.</p>`,
  },
  {
    file: '05-securite',
    id: '05-securite',
    title: 'Module 5 — Sécurité Electron',
    level: 'Intermédiaire',
    hours: '8h',
    prereq: 'Module 4',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Appliquer les recommandations officielles Electron</li>
      <li>Configurer CSP, sandbox, contextIsolation</li>
      <li>Valider les entrées IPC</li>
      <li>Éviter les vulnérabilités XSS → RCE</li>
    </ul>

    <h2>2. Checklist sécurité</h2>
    <table>
      <tr><th>Règle</th><th>Valeur</th></tr>
      <tr><td>nodeIntegration</td><td>false</td></tr>
      <tr><td>contextIsolation</td><td>true</td></tr>
      <tr><td>sandbox</td><td>true (recommandé)</td></tr>
      <tr><td>enableRemoteModule</td><td>false (déprécié)</td></tr>
    </table>

    <h2>3. Validation IPC</h2>
    <pre><code>ipcMain.handle('db:query', async (_event, sql) => {
  // JAMAIS exécuter du SQL arbitraire du renderer !
  if (typeof sql !== 'string') throw new Error('Invalid input');
  const allowed = ['SELECT * FROM notes'];
  if (!allowed.includes(sql)) throw new Error('Query not allowed');
  // ...
});</code></pre>

    <h2>4. CSP</h2>
    <pre><code>&lt;meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"&gt;</code></pre>

    <h2>5. Erreurs critiques</h2>
    <div class="alert alert--warning">XSS dans le renderer + nodeIntegration = exécution code arbitraire sur la machine.</div>

    <h2>6. Challenge</h2>
    <p>Auditez un projet Electron open source et listez 5 points de sécurité.</p>`,
  },
  {
    file: '06-ui-native',
    id: '06-ui-native',
    title: 'Module 6 — UI native, menus & notifications',
    level: 'Intermédiaire',
    hours: '10h',
    prereq: 'Module 5',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Créer Menu, MenuItem, Tray</li>
      <li>Utiliser dialog (open, save, message)</li>
      <li>Notifications système nativeNotification</li>
      <li>Raccourcis clavier globaux</li>
    </ul>

    <h2>2. Menu application</h2>
    <pre><code>import { Menu, app } from 'electron';

const template = [
  { label: 'Fichier', submenu: [
    { label: 'Nouveau', accelerator: 'CmdOrCtrl+N', click: createWindow },
    { type: 'separator' },
    { role: 'quit' },
  ]},
  { label: 'Édition', submenu: [
    { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
    { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
  ]},
];
Menu.setApplicationMenu(Menu.buildFromTemplate(template));</code></pre>

    <h2>3. Dialog</h2>
    <pre><code>import { dialog } from 'electron';

const { filePaths } = await dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Texte', extensions: ['txt', 'md'] }],
});</code></pre>

    <h2>4. Notifications</h2>
    <pre><code>import { Notification } from 'electron';
new Notification({ title: 'Sauvegarde', body: 'Fichier enregistré.' }).show();</code></pre>

    <h2>5. Challenge</h2>
    <p>Menu Fichier → Ouvrir / Enregistrer avec dialog natif + notification succès.</p>`,
  },
  {
    file: '07-fichiers',
    id: '07-fichiers',
    title: 'Module 7 — Système de fichiers',
    level: 'Intermédiaire',
    hours: '8h',
    prereq: 'Module 6',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Lire/écrire fichiers depuis le Main Process</li>
      <li>Utiliser app.getPath('userData')</li>
      <li>Drag & drop de fichiers</li>
      <li>Watchers fs.watch</li>
    </ul>

    <h2>2. Chemins Electron</h2>
    <pre><code>import { app } from 'electron';
import path from 'node:path';

const userData = app.getPath('userData');
const configPath = path.join(userData, 'config.json');</code></pre>

    <h2>3. Lecture / écriture</h2>
    <pre><code>import fs from 'node:fs/promises';

await fs.writeFile(configPath, JSON.stringify(config, null, 2));
const data = JSON.parse(await fs.readFile(configPath, 'utf-8'));</code></pre>

    <h2>4. Challenge</h2>
    <p>Éditeur Markdown : ouvrir, modifier, sauvegarder un fichier .md via IPC + dialog.</p>`,
  },
  {
    file: '08-sqlite',
    id: '08-sqlite',
    title: 'Module 8 — SQLite dans Electron',
    level: 'Avancé',
    hours: '12h',
    prereq: 'Module 7',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Intégrer better-sqlite3 dans le Main Process</li>
      <li>CRUD complet via IPC</li>
      <li>Migrations et schéma de base</li>
    </ul>

    <h2>2. Pourquoi Main Process ?</h2>
    <p>SQLite s'exécute côté Node.js (Main). Le Renderer appelle <code>window.api.db.*</code> via Preload.</p>

    <h2>3. Installation</h2>
    <pre><code>npm install better-sqlite3
# Rebuild pour Electron si nécessaire :
npx electron-rebuild</code></pre>

    <h2>4. Service database</h2>
    <pre><code>// main/database.js
import Database from 'better-sqlite3';
import path from 'node:path';
import { app } from 'electron';

const dbPath = path.join(app.getPath('userData'), 'app.db');
const db = new Database(dbPath);

db.exec(\`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
\`);

export const getTasks = () => db.prepare('SELECT * FROM tasks').all();
export const addTask = (title) =>
  db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);</code></pre>

    <h2>5. IPC</h2>
    <pre><code>ipcMain.handle('tasks:list', () => getTasks());
ipcMain.handle('tasks:add', (_e, title) => addTask(title));</code></pre>

    <h2>6. Challenge</h2>
    <p>Gestionnaire de tâches avec SQLite : ajouter, cocher, supprimer, filtrer.</p>`,
  },
  {
    file: '09-api-rest',
    id: '09-api-rest',
    title: 'Module 9 — API REST & authentification JWT',
    level: 'Avancé',
    hours: '12h',
    prereq: 'Module 8',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Appeler une API REST depuis Electron</li>
      <li>Gérer JWT (login, refresh, stockage sécurisé)</li>
      <li>Centraliser les appels HTTP dans le Main ou via Preload</li>
    </ul>

    <h2>2. Où faire les requêtes ?</h2>
    <table>
      <tr><th>Approche</th><th>Avantage</th></tr>
      <tr><td>Main Process (fetch Node 18+)</td><td>Tokens cachés au renderer</td></tr>
      <tr><td>Renderer via Preload</td><td>Plus simple, tokens exposés</td></tr>
    </table>

    <h2>3. Auth dans le Main</h2>
    <pre><code>import { safeStorage } from 'electron';

let token = null;

ipcMain.handle('auth:login', async (_e, { email, password }) => {
  const res = await fetch('https://api.example.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await res.json();
  token = accessToken;
  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(accessToken);
    // Stocker encrypted dans userData
  }
  return { success: true };
});</code></pre>

    <h2>4. Challenge</h2>
    <p>Écran login → API REST → stockage token → écran dashboard protégé.</p>`,
  },
  {
    file: '10-sync-offline',
    id: '10-sync-offline',
    title: 'Module 10 — Synchronisation & mode offline',
    level: 'Avancé',
    hours: '10h',
    prereq: 'Module 9',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Détecter online/offline (net.isOnline)</li>
      <li>File d'attente de synchronisation</li>
      <li>Résolution de conflits last-write-wins</li>
    </ul>

    <h2>2. Architecture sync</h2>
    <div class="ascii-diagram">Action utilisateur → SQLite local (immédiat)
                    → Queue sync (si offline)
                    → Au retour online : push vers API REST</div>

    <h2>3. Queue offline</h2>
    <pre><code>// Table sync_queue: id, action, payload, created_at, synced
async function syncPending() {
  if (!net.isOnline()) return;
  const pending = db.prepare('SELECT * FROM sync_queue WHERE synced=0').all();
  for (const item of pending) {
    await pushToApi(item);
    db.prepare('UPDATE sync_queue SET synced=1 WHERE id=?').run(item.id);
  }
}</code></pre>

    <h2>4. Challenge</h2>
    <p>App notes : créer offline, sync auto au retour réseau.</p>`,
  },
  {
    file: '11-architecture',
    id: '11-architecture',
    title: 'Module 11 — Architecture propre',
    level: 'Avancé',
    hours: '12h',
    prereq: 'Module 10',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Structurer un projet Electron maintenable</li>
      <li>Séparer main / preload / renderer / services</li>
      <li>Patterns : services, handlers IPC par domaine</li>
    </ul>

    <h2>2. Structure recommandée</h2>
    <div class="ascii-diagram">src/
├── main/
│   ├── index.ts
│   ├── windows/
│   ├── ipc/
│   │   ├── file.handlers.ts
│   │   └── db.handlers.ts
│   └── services/
│       ├── database.service.ts
│       └── sync.service.ts
├── preload/
│   └── index.ts
└── renderer/
    ├── index.html
    ├── styles/
    └── js/</div>

    <h2>3. Enregistrement handlers</h2>
    <pre><code>// main/ipc/index.js
import { registerFileHandlers } from './file.handlers.js';
import { registerDbHandlers } from './db.handlers.js';

export function registerAllIpc() {
  registerFileHandlers();
  registerDbHandlers();
}</code></pre>

    <h2>4. Challenge</h2>
    <p>Refactoriser un projet monolithique main.js en architecture modulaire.</p>`,
  },
  {
    file: '12-debugging',
    id: '12-debugging',
    title: 'Module 12 — Debugging Electron',
    level: 'Expert',
    hours: '8h',
    prereq: 'Module 11',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>DevTools pour le Renderer</li>
      <li>Debug du Main Process (VS Code launch.json)</li>
      <li>Logs structurés (electron-log)</li>
      <li>Performance et memory leaks</li>
    </ul>

    <h2>2. DevTools Renderer</h2>
    <pre><code>mainWindow.webContents.openDevTools({ mode: 'detach' });</code></pre>

    <h2>3. Debug Main (VS Code)</h2>
    <pre><code>// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Debug Electron Main",
    "type": "node",
    "request": "launch",
    "cwd": "\${workspaceFolder}",
    "runtimeExecutable": "\${workspaceFolder}/node_modules/.bin/electron",
    "args": ["."],
    "outputCapture": "std"
  }]
}</code></pre>

    <h2>4. electron-log</h2>
    <pre><code>import log from 'electron-log';
log.info('App démarrée');
log.error('Erreur IPC', error);</code></pre>

    <h2>5. Challenge</h2>
    <p>Reproduire et corriger 3 bugs fournis (IPC, memory leak, race condition).</p>`,
  },
  {
    file: '13-tests',
    id: '13-tests',
    title: 'Module 13 — Tests Jest & Playwright',
    level: 'Expert',
    hours: '10h',
    prereq: 'Module 12',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Tests unitaires des services (Jest)</li>
      <li>Tests E2E Electron (Playwright)</li>
      <li>Mock IPC pour tests isolés</li>
    </ul>

    <h2>2. Jest — service DB</h2>
    <pre><code>import { describe, it, expect } from '@jest/globals';
import { addTask, getTasks } from '../main/services/database.js';

describe('database', () => {
  it('ajoute une tâche', () => {
    addTask('Test');
    expect(getTasks()).toHaveLength(1);
  });
});</code></pre>

    <h2>3. Playwright Electron</h2>
    <pre><code>import { _electron as electron } from 'playwright';

test('fenêtre principale', async () => {
  const app = await electron.launch({ args: ['.'] });
  const window = await app.firstWindow();
  await expect(window).toHaveTitle('Mon App');
  await app.close();
});</code></pre>

    <h2>4. Challenge</h2>
    <p>5 tests unitaires + 2 tests E2E pour le gestionnaire de tâches.</p>`,
  },
  {
    file: '14-packaging',
    id: '14-packaging',
    title: 'Module 14 — Packaging multi-plateforme',
    level: 'Expert',
    hours: '8h',
    prereq: 'Module 13',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Packager avec electron-builder</li>
      <li>EXE Windows, DMG macOS, AppImage Linux</li>
      <li>Icônes, metadata, ASAR</li>
    </ul>

    <h2>2. Installation</h2>
    <pre><code>npm install electron-builder --save-dev</code></pre>

    <h2>3. package.json build</h2>
    <pre><code>"build": {
  "appId": "com.wazabicode.monapp",
  "productName": "Mon App",
  "directories": { "output": "dist" },
  "win": { "target": "nsis", "icon": "assets/icon.ico" },
  "mac": { "target": "dmg", "icon": "assets/icon.icns" },
  "linux": { "target": "AppImage", "icon": "assets/icon.png" }
},
"scripts": {
  "dist": "electron-builder",
  "dist:win": "electron-builder --win",
  "dist:mac": "electron-builder --mac",
  "dist:linux": "electron-builder --linux"
}</code></pre>

    <h2>4. Challenge</h2>
    <p>Produire les 3 artefacts pour votre OS + tester l'installateur.</p>`,
  },
  {
    file: '15-deploiement',
    id: '15-deploiement',
    title: 'Module 15 — Déploiement & CI/CD',
    level: 'Expert',
    hours: '8h',
    prereq: 'Module 14',
    body: `
    <h2>1. Objectifs</h2>
    <ul>
      <li>Auto-update avec electron-updater</li>
      <li>CI/CD GitHub Actions multi-OS</li>
      <li>Code signing (aperçu)</li>
      <li>Publication GitHub Releases</li>
    </ul>

    <h2>2. electron-updater</h2>
    <pre><code>import { autoUpdater } from 'electron-updater';

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});</code></pre>

    <h2>3. GitHub Actions</h2>
    <pre><code># .github/workflows/release.yml
name: Release
on: push: tags: ['v*']
jobs:
  build:
    strategy:
      matrix: { os: [ubuntu-latest, windows-latest, macos-latest] }
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run dist
      - uses: softprops/action-gh-release@v1</code></pre>

    <h2>4. Challenge</h2>
    <p>Pipeline CI qui build et publie sur tag v1.0.0.</p>`,
  },
];

const PROJECTS = [
  {
    file: 'projet-bloc-notes',
    id: 'projet-bloc-notes',
    title: 'Projet Débutant — Bloc-notes Desktop',
    level: 'Débutant',
    hours: '12h',
    body: `
    <h2>Objectif</h2>
    <p>Créer un bloc-notes Electron minimal : éditeur texte, sauvegarde fichier via IPC et dialog natif.</p>
    <h2>Fonctionnalités</h2>
    <ul><li>Zone de texte multiligne</li><li>Ouvrir / Enregistrer (dialog)</li><li>Raccourcis Ctrl+S</li><li>Menu Fichier natif</li></ul>
    <h2>Stack</h2>
    <p>Electron, preload + IPC, fs (Main), dialog</p>
    <h2>Livrables</h2>
    <p>Repo Git, README, capture d'écran, démo vidéo 2 min.</p>`,
  },
  {
    file: 'projet-fichiers',
    id: 'projet-fichiers',
    title: 'Projet Intermédiaire — Gestionnaire de fichiers',
    level: 'Intermédiaire',
    hours: '15h',
    body: `
    <h2>Objectif</h2>
    <p>Explorateur de fichiers local : arborescence, prévisualisation, création/suppression via IPC sécurisé.</p>
    <h2>Fonctionnalités</h2>
    <ul><li>Liste dossiers/fichiers</li><li>Prévisualisation .txt/.md</li><li>Créer dossier, supprimer fichier</li><li>Validation chemins (sécurité)</li></ul>`,
  },
  {
    file: 'projet-tasks',
    id: 'projet-tasks',
    title: 'Projet Avancé — Gestionnaire de tâches + SQLite',
    level: 'Avancé',
    hours: '20h',
    body: `
    <h2>Objectif</h2>
    <p>App tasks complète : CRUD SQLite, recherche, filtres, persistance, architecture modulaire.</p>
    <h2>Fonctionnalités</h2>
    <ul><li>Ajouter / modifier / supprimer / cocher</li><li>Recherche et filtres (toutes / actives / terminées)</li><li>better-sqlite3 dans Main</li><li>Tests unitaires services</li></ul>`,
  },
  {
    file: 'projet-saas',
    id: 'projet-saas',
    title: 'Projet Expert — SaaS Desktop complet',
    level: 'Expert',
    hours: '40h',
    body: `
    <h2>Objectif</h2>
    <p>Application Desktop type SaaS : auth JWT, SQLite local, sync API REST, paramètres, notifications, export PDF, dashboard.</p>
    <h2>Fonctionnalités obligatoires</h2>
    <ul>
      <li>Authentification (login/logout, token sécurisé)</li>
      <li>SQLite — données locales</li>
      <li>API REST — synchronisation</li>
      <li>Mode offline + queue sync</li>
      <li>Page paramètres (thème, compte)</li>
      <li>Notifications natives</li>
      <li>Export PDF</li>
      <li>Tableau de bord statistiques</li>
      <li>Packaging 3 OS + CI/CD</li>
    </ul>
    <div class="ascii-diagram">┌─────────────────────────────────────────────┐
│  Renderer (HTML/CSS/JS) — Dashboard, Login  │
├─────────────────────────────────────────────┤
│  Preload — API: auth, db, sync, export        │
├─────────────────────────────────────────────┤
│  Main — IPC, SQLite, fetch API, PDF, sync   │
└─────────────────────────────────────────────┘</div>`,
  },
];

function pageTemplate({ id, title, level, hours, prereq, body }) {
  const prereqHtml = prereq ? `<span class="course-meta__badge">Prérequis : ${prereq}</span>` : '';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — wazabiCode Electron</title>
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

// Supprimer anciennes pages hors cursus
const OBSOLETE = [
  '02-html5', '03-css3', '04-javascript-debutant', '05-javascript-intermediaire',
  '06-javascript-avance', '07-sqlite', '08-nodejs', '09-electron',
  '10-electron-sqlite', '11-electron-api', 'projet-notes', 'projet-meteo',
];
for (const f of OBSOLETE) {
  const p = path.join(pagesDir, `${f}.html`);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log('Deleted:', p);
  }
}

const allPages = [...MODULES, ...PROJECTS];
for (const mod of allPages) {
  const filePath = path.join(pagesDir, `${mod.file}.html`);
  const html = pageTemplate(mod);
  if (!fs.existsSync(filePath) || force) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log('Written:', filePath);
  } else {
    console.log('Skipped:', filePath);
  }
}

console.log('Done. Use --force to overwrite.');
