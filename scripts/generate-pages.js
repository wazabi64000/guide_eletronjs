/**
 * Génère le cursus Electron.js — wazabiCode
 * Basé sur la documentation officielle : https://www.electronjs.org/fr/docs/latest/
 * Usage: node scripts/generate-pages.js --force
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ce, PKG_FINAL, CMD_INSTALL, HTML_INDEX, PRELOAD_BASIC, WEB_PREFS,
  PRELOAD_IPC, MAIN_IPC, HTML_IPC, NAV_ESM, MENU_ESM, DIALOG_ESM, DIALOG_FILE,
  CSP_META, DEBUG_DEVTOOLS, DEBUG_VSCODE, LOG_ESM, JEST_ESM, PLAYWRIGHT_ESM,
  BUILD_PKG, UPDATER_ESM, UPDATER_FLOW, MAIN_MINIMAL, PROCESS_MODEL,
  BUILD_INSTALL, DIST_CMDS, TEST_CMDS, PLAYWRIGHT_INSTALL,
} from './course-explain.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'pages');
const force = process.argv.includes('--force');

const OFFICIAL = 'https://www.electronjs.org/fr/docs/latest';
const ESM_DOC = `${OFFICIAL}/tutorial/esm`;

/** En-tête ESM standard pour main.js (réutilisé dans les exemples) */
const MAIN_IMPORTS = `import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));`;

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
    <h2>3. Les fichiers du projet (attention aux noms !)</h2>
    <table>
      <tr><th>Fichier</th><th>Rôle</th><th>Créé quand ?</th></tr>
      <tr><td><code>package.json</code></td><td>Configuration npm + point d'entrée Electron</td><td>Chapitre 1</td></tr>
      <tr><td><code>main.js</code></td><td>Démarre Electron, ouvre la fenêtre</td><td>Chapitre 3</td></tr>
      <tr><td><code>index.html</code></td><td>Interface visible (HTML/CSS/JS)</td><td>Chapitre 2</td></tr>
    </table>
    <div class="alert alert--warning">
      <strong>Piège fréquent :</strong> <code>npm init -y</code> met <code>"main": "index.js"</code>.
      Ce n'est <em>pas</em> <code>index.html</code> ! Ne créez pas un <code>index.js</code> vide — utilisez <code>main.js</code> pour Electron.
    </div>
    <div class="ascii-diagram">mon-app-electron/          (état final chapitre 3)
├── package.json             "main": "main.js"
├── main.js                  ← Electron démarre ici
├── index.html               ← l'utilisateur voit ceci
└── node_modules/electron/</div>
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
      <li>Connaître <code>import</code> / <code>export</code> en JavaScript (modules ESM)</li>
      <li>Avoir Node.js installé (nous le vérifions au chapitre 1)</li>
    </ul>
    <div class="alert alert--info">
      <strong>Modules ESM uniquement</strong> — ce cours utilise <code>import</code> / <code>export</code>,
      pas <code>require()</code> (CommonJS). Voir la
      <a href="${ESM_DOC}" target="_blank" rel="noopener">doc officielle ESM dans Electron</a>.
    </div>
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
      <li>Configurer correctement <code>package.json</code> (point d'entrée <code>main.js</code>)</li>
      <li>Comprendre pourquoi <code>npx electron .</code> échoue si <code>main.js</code> n'existe pas encore</li>
    </ul>

    <h2>2. Installer Node.js</h2>
    <p>Téléchargez la version <strong>LTS</strong> sur <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a>, puis vérifiez :</p>
    <pre><code>node --version   # ex: v22.x.x
npm --version    # ex: 10.x.x</code></pre>

    <h2>3. Créer le projet — commandes</h2>
    <pre><code>mkdir mon-app-electron
cd mon-app-electron
npm init -y
npm install electron --save-dev</code></pre>
    ${CMD_INSTALL}

    <h2>4. Étape A — Ce que <code>npm init -y</code> produit réellement</h2>
    <p>Après <code>npm init -y</code>, votre <code>package.json</code> ressemble exactement à ceci :</p>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}</code></pre>
    ${ce('Explication — champs par défaut de npm init', [
      ['"main": "index.js"', 'Valeur <strong>par défaut de npm</strong> — point d\'entrée Node.js classique, pas adapté à Electron.'],
      ['"scripts".test', 'Script de test placeholder — on le garde, on ajoute <code>start</code> plus tard.'],
      ['Pas de devDependencies', 'Normal : Electron n\'est pas encore installé à cette étape.'],
    ])}
    <p>⚠️ <code>"main": "index.js"</code> est le point d'entrée <strong>Node.js par défaut</strong>, pas Electron. Ce fichier n'existe pas encore.</p>

    <h2>5. Étape B — Après <code>npm install electron --save-dev</code></h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "electron": "^42.5.0"
  }
}</code></pre>
    ${ce('Explication — après npm install electron', [
      ['devDependencies.electron', 'Electron est listé ici : npm sait qu\'il est requis pour développer l\'app.'],
      ['^42.5.0', 'Version installée (le <code>^</code> permet les mises à jour mineures compatibles).'],
      ['"main" toujours index.js', '⚠️ Toujours incorrect — à corriger à l\'étape C.'],
    ])}
    <p>Electron est installé, mais <strong>l'app ne peut toujours pas démarrer</strong> : <code>index.js</code> n'existe pas.</p>

    <h2>6. Étape C — Corriger <code>package.json</code> (obligatoire)</h2>
    <p>Modifiez <strong>uniquement</strong> ces lignes (gardez le reste) :</p>
    <table>
      <tr><th>Champ</th><th>❌ Avant</th><th>✅ Après</th></tr>
      <tr><td><code>main</code></td><td><code>"index.js"</code></td><td><code>"main.js"</code></td></tr>
      <tr><td><code>type</code></td><td>absent</td><td><code>"module"</code> (ESM — obligatoire)</td></tr>
      <tr><td><code>scripts</code></td><td>seulement <code>test</code></td><td>ajouter <code>"start": "electron ."</code></td></tr>
      <tr><td><code>description</code></td><td><code>""</code></td><td><code>"Ma première app Electron"</code> (optionnel)</td></tr>
    </table>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "description": "Ma première app Electron",
  "type": "module",
  "main": "main.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "start": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^42.5.0"
  }
}</code></pre>
    ${PKG_FINAL}
    <p><code>"type": "module"</code> active les <strong>modules ESM</strong> : vous utiliserez <code>import</code> au lieu de <code>require()</code> dans <code>main.js</code> et <code>preload.js</code>.</p>
    <div class="alert alert--warning">
      <strong>Ne créez pas <code>index.js</code> !</strong> Si ce fichier existe vide, supprimez-le :
      <code>rm index.js</code>. Le point d'entrée Electron est <code>main.js</code> (chapitre 3).
    </div>

    <h2>7. État du projet après le chapitre 1</h2>
    <div class="ascii-diagram">mon-app-electron/
├── package.json       ✅ corrigé ("main": "main.js")
├── node_modules/
│   └── electron/      ✅ installé
├── main.js            ❌ pas encore (chapitre 3)
└── index.html         ❌ pas encore (chapitre 2)

⛔ npm start → erreur "Cannot find module main.js" → NORMAL</div>
    <p><strong>Ne lancez pas</strong> <code>npm start</code> ni <code>npx electron .</code> avant le chapitre 3.</p>

    <h2>8. Fil conducteur du cours</h2>
    <table>
      <tr><th>Chapitre</th><th>Action</th><th><code>npm start</code> ?</th></tr>
      <tr><td>1</td><td>npm init + install electron + corriger package.json</td><td>❌ Trop tôt</td></tr>
      <tr><td>2</td><td>Créer <code>index.html</code></td><td>❌ main.js manquant</td></tr>
      <tr><td>3</td><td>Créer <code>main.js</code></td><td>✅ Fonctionne !</td></tr>
    </table>

    <h2>9. Personnalisation (doc officielle)</h2>
    <table>
      <tr><th>Option</th><th>Commande</th></tr>
      <tr><td>Architecture x64 sur ARM</td><td><code>npm install --arch=x64 electron</code></td></tr>
      <tr><td>Plateforme Windows depuis Linux</td><td><code>npm install --platform=win32 electron</code></td></tr>
      <tr><td>Version alpha/beta</td><td><code>npm install electron@beta --save-dev</code></td></tr>
      <tr><td>Sans télécharger le binaire (CI)</td><td><code>ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install</code></td></tr>
    </table>

    <h3>Miroir (réseau lent ou Chine)</h3>
    <pre><code>export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm install electron --save-dev</code></pre>

    <h2>10. Résolution des problèmes</h2>
    <table>
      <tr><th>Erreur</th><th>Cause</th><th>Solution</th></tr>
      <tr><td><code>Cannot find module 'index.js'</code></td><td><code>"main": "index.js"</code> non modifié</td><td>Mettre <code>"main": "main.js"</code></td></tr>
      <tr><td><code>Cannot find module 'main.js'</code></td><td>Chapitre 3 pas fait</td><td>Créer <code>main.js</code> ou attendre ch. 3</td></tr>
      <tr><td><code>index.js</code> vide existe</td><td>Confusion index.js / main.js</td><td><code>rm index.js</code> + <code>"main": "main.js"</code></td></tr>
      <tr><td><code>require is not defined</code></td><td>ESM activé sans <code>import</code></td><td><code>"type": "module"</code> + utiliser <code>import</code></td></tr>
      <tr><td>ELIFECYCLE, ETIMEDOUT</td><td>Réseau</td><td><code>npm install --verbose electron</code></td></tr>
    </table>

    <h2>11. Exercice</h2>
    <ol>
      <li><code>npm init -y</code> — comparez votre JSON avec la section 4</li>
      <li><code>npm install electron --save-dev</code> — comparez avec la section 5</li>
      <li>Corrigez <code>package.json</code> — résultat identique à la section 6</li>
      <li>Vérifiez : pas de <code>index.js</code>, pas de <code>main.js</code> encore</li>
    </ol>

    <h2>12. Challenge</h2>
    <p>Installez avec <code>--verbose</code> et trouvez le cache Electron (<code>~/.cache/electron/</code> sur Linux).</p>`,
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
    ${HTML_INDEX}

    <h2>3. Tester dans le navigateur (optionnel)</h2>
    <p>Ouvrez <code>index.html</code> dans Chrome pour vérifier le rendu. Ce n'est <em>pas</em> encore Electron, mais utile pour déboguer le HTML/CSS.</p>

    <h2>4. Structure après le chapitre 2</h2>
    <div class="ascii-diagram">mon-app-electron/
├── package.json       "main": "main.js"  (corrigé ch.1)
├── index.html         ✅ créé maintenant
├── node_modules/electron/
└── main.js            ❌ chapitre 3

⛔ npm start → "Cannot find module main.js" → NORMAL</div>

    <div class="alert alert--info">
      <strong>Rappel :</strong> <code>index.html</code> ≠ <code>index.js</code>.
      Le HTML est l'interface ; <code>main.js</code> (pas encore créé) lancera Electron au chapitre 3.
    </div>

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

    <h2>2. main.js — version minimale (ESM)</h2>
    <pre><code>// main.js — Main Process (modules ESM)
${MAIN_IMPORTS}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    title: 'Ma première app Electron',
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});</code></pre>
    ${MAIN_MINIMAL}

    <h2>3. Explication ligne par ligne</h2>
    <p>Quand vous lancez <code>npm start</code>, Node.js exécute <code>main.js</code> dans le <strong>Main Process</strong>. Voici ce que fait chaque partie du fichier, dans l'ordre d'exécution.</p>

    <div class="ascii-diagram">npm start
   │
   ▼
Electron lit package.json → charge main.js (Main Process)
   │
   ▼
Les import sont résolus
   │
   ▼
app.whenReady() attend que Electron soit prêt
   │
   ▼
createWindow() → new BrowserWindow() → loadFile(index.html)
   │
   ▼
L'utilisateur voit la fenêtre avec votre page HTML</div>

    <h3>Les imports (début du fichier)</h3>
    <table>
      <tr><th>Code</th><th>Explication détaillée</th></tr>
      <tr>
        <td><code>import { app, BrowserWindow } from 'electron'</code></td>
        <td>
          <strong><code>app</code></strong> — objet principal qui représente votre application Electron (cycle de vie : démarrage, fermeture).<br>
          <strong><code>BrowserWindow</code></strong> — classe pour créer une fenêtre Desktop (avec Chromium intégré à l'intérieur).<br>
          Les accolades <code>{ }</code> signifient qu'on importe seulement ces deux noms depuis le package <code>electron</code>.
        </td>
      </tr>
      <tr>
        <td><code>import path from 'node:path'</code></td>
        <td>
          Module <strong>Node.js</strong> pour manipuler les chemins de fichiers de façon cross-platform
          (<code>C:\\projets\\</code> sur Windows, <code>/home/user/</code> sur Linux).<br>
          On l'utilise pour construire le chemin vers <code>index.html</code> sans se tromper de slash.
        </td>
      </tr>
      <tr>
        <td><code>import { fileURLToPath } from 'node:url'</code></td>
        <td>
          En ESM, on n'a pas <code>__dirname</code> automatiquement (contrairement à l'ancien <code>require</code>).<br>
          <code>import.meta.url</code> donne l'URL du fichier courant (ex : <code>file:///home/.../main.js</code>).<br>
          <code>fileURLToPath()</code> convertit cette URL en chemin système lisible par <code>loadFile()</code>.
        </td>
      </tr>
      <tr>
        <td><code>const __dirname = path.dirname(...)</code></td>
        <td>
          <strong><code>__dirname</code></strong> = dossier où se trouve <code>main.js</code> (pas le fichier lui-même).<br>
          Exemple : si <code>main.js</code> est dans <code>/home/user/mon-app-electron/</code>, alors <code>__dirname</code> pointe vers ce dossier.<br>
          Indispensable pour charger <code>index.html</code> au bon endroit, peu importe d'où vous lancez <code>npm start</code>.
        </td>
      </tr>
    </table>

    <h3>La fonction <code>createWindow()</code></h3>
    <table>
      <tr><th>Code</th><th>Explication détaillée</th></tr>
      <tr>
        <td><code>new BrowserWindow({ ... })</code></td>
        <td>
          Crée une <strong>nouvelle fenêtre</strong> native (barre de titre, boutons réduire/fermer).<br>
          À l'intérieur, Electron embarque un Chromium invisible qui affichera votre HTML.<br>
          <code>width</code> / <code>height</code> — taille en pixels.<br>
          <code>title</code> — texte affiché dans la barre de titre de la fenêtre.
        </td>
      </tr>
      <tr>
        <td><code>win.loadFile(path.join(__dirname, 'index.html'))</code></td>
        <td>
          <strong><code>path.join(__dirname, 'index.html')</code></strong> — assemble le chemin complet vers votre page
          (ex : <code>/home/user/mon-app-electron/index.html</code>).<br>
          <strong><code>win.loadFile(...)</code></strong> — charge ce fichier HTML <em>dans</em> la fenêtre. C'est le moment où votre interface devient visible.<br>
          Sans cette ligne : fenêtre vide ou blanche.
        </td>
      </tr>
    </table>

    <h3>Le cycle de vie de l'application</h3>
    <table>
      <tr><th>Code</th><th>Explication détaillée</th></tr>
      <tr>
        <td><code>app.whenReady().then(createWindow)</code></td>
        <td>
          Electron a besoin de quelques millisecondes pour s'initialiser (Chromium, modules internes).<br>
          <strong>On ne peut pas</strong> créer une fenêtre avant la fin de cette initialisation.<br>
          <code>whenReady()</code> retourne une Promise : dès qu'Electron est prêt, il appelle <code>createWindow()</code>.<br>
          C'est la ligne qui <strong>déclenche l'affichage</strong> de votre app.
        </td>
      </tr>
      <tr>
        <td><code>app.on('window-all-closed', ...)</code></td>
        <td>
          Événement déclenché quand l'utilisateur <strong>ferme toutes les fenêtres</strong>.<br>
          Sur <strong>Windows et Linux</strong> : on quitte l'application (<code>app.quit()</code>).<br>
          Sur <strong>macOS</strong> : l'app reste souvent active dans le dock → on ne quitte pas automatiquement (<code>process.platform !== 'darwin'</code>).
        </td>
      </tr>
      <tr>
        <td><code>app.on('activate', ...)</code></td>
        <td>
          Spécifique <strong>macOS</strong> : quand l'utilisateur clique sur l'icône du dock et qu'aucune fenêtre n'est ouverte.<br>
          On recrée une fenêtre pour que l'app ne paraisse pas « morte ». Bonne pratique officielle Electron.
        </td>
      </tr>
    </table>

    <div class="alert alert--success">
      <strong>À retenir :</strong> <code>main.js</code> ne dessine rien à l'écran directement. Il <em>orchestre</em> :
      attendre Electron → créer une fenêtre → y charger <code>index.html</code>. C'est le HTML qui contient l'interface visible.
    </div>

    <h2>4. package.json final (vérifiez avant de lancer)</h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "description": "Ma première app Electron",
  "type": "module",
  "main": "main.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^42.5.0"
  }
}</code></pre>
    ${PKG_FINAL}
    <p>Sur Linux (Pop!_OS, Ubuntu), si messages GPU au démarrage, utilisez plutôt :</p>
    <pre><code>"start": "electron . --disable-gpu-sandbox"</code></pre>

    <h2>5. Structure complète — prête à lancer</h2>
    <div class="ascii-diagram">mon-app-electron/
├── package.json       "main": "main.js" ✅
├── main.js            ✅ créé (section 2)
├── index.html         ✅ créé (chapitre 2)
└── node_modules/electron/

→ npm start  ✅</div>

    <h2>6. Lancer l'application</h2>
    <pre><code>npm start
# équivalent : npx electron .</code></pre>
    <p>🎉 La fenêtre s'ouvre avec <code>index.html</code> !</p>

    <h2>7. DevTools</h2>
    <p>Dans la fenêtre : <code>Ctrl+Shift+I</code> (Windows/Linux) ou <code>Cmd+Option+I</code> (macOS) pour ouvrir les outils de développement Chrome.</p>

    <h2>8. Exercice</h2>
    <p>Changez la taille de la fenêtre à 1200×800 et modifiez le titre.</p>

    <h2>9. Checklist de cohérence</h2>
    <table>
      <tr><th>Vérification</th><th>Attendu</th></tr>
      <tr><td><code>package.json</code> → <code>main</code></td><td><code>"main.js"</code> (pas index.js)</td></tr>
      <tr><td>Fichier <code>index.js</code></td><td>Absent (supprimez-le s'il existe)</td></tr>
      <tr><td><code>package.json</code> → <code>type</code></td><td><code>"module"</code> (ESM)</td></tr>
      <tr><td>Fichier <code>main.js</code></td><td>Présent, avec <code>import</code> ESM</td></tr>
      <tr><td>Fichier <code>index.html</code></td><td>Présent</td></tr>
      <tr><td><code>npm start</code></td><td>Fenêtre Electron visible</td></tr>
    </table>

    <h2>10. Erreurs fréquentes</h2>
    <table>
      <tr><th>Erreur</th><th>Solution</th></tr>
      <tr><td><code>Cannot find module 'index.js'</code></td><td>Dans <code>package.json</code>, remplacez <code>"main": "index.js"</code> par <code>"main": "main.js"</code></td></tr>
      <tr><td><code>Cannot find module 'main.js'</code></td><td>Créez le fichier <code>main.js</code> (code section 2 ci-dessus)</td></tr>
      <tr><td><code>Cannot find module 'electron'</code></td><td><code>npm install electron --save-dev</code></td></tr>
      <tr><td>Page blanche</td><td>Vérifiez <code>win.loadFile(..., 'index.html')</code></td></tr>
      <tr><td><code>VAAPI</code> / <code>MESA-LOADER</code> (Linux)</td><td>Avertissements GPU — voir section 9 ci-dessous</td></tr>
    </table>

    <h2>11. Linux (Pop!_OS, Ubuntu) — messages GPU</h2>
    <p>Sous Linux, vous pouvez voir dans le terminal :</p>
    <pre><code>VAAPI version is too old...
MESA-LOADER: failed to open dri ... Permission non accordée</code></pre>
    <p>Ce sont des <strong>avertissements du pilote graphique</strong>, pas forcément un crash. Si la fenêtre s'ouvre, ignorez-les.</p>
    <p>Si la fenêtre ne s'ouvre pas ou l'app plante, modifiez le script <code>start</code> dans <code>package.json</code> :</p>
    <pre><code>"scripts": {
  "start": "electron . --disable-gpu-sandbox",
  "start:gpu": "electron ."
}</code></pre>
    <p>Puis lancez <code>npm start</code>. L'option <code>--disable-gpu-sandbox</code> contourne les problèmes de permissions sur <code>dri_gbm.so</code>.</p>
    <div class="alert alert--info">
      <strong>Vérifier aussi :</strong> ne laissez pas <code>"main": "index.js"</code> avec un fichier vide.
      Electron doit pointer vers <code>main.js</code> qui charge <code>index.html</code>.
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
      <tr><th>Besoin</th><th>Fichier</th><th>Syntaxe</th></tr>
      <tr><td>Créer une fenêtre</td><td>main.js</td><td><code>import</code> ESM</td></tr>
      <tr><td>Style CSS, boutons</td><td>index.html</td><td>HTML + &lt;script&gt;</td></tr>
      <tr><td>Pont sécurisé</td><td>preload.js</td><td><code>import</code> ESM</td></tr>
      <tr><td>Logique UI modulaire</td><td>renderer.js</td><td><code>import</code> via &lt;script type="module"&gt;</td></tr>
    </table>
    <div class="alert alert--info">
      <strong>Main & Preload</strong> = ESM (<code>import</code>) grâce à <code>"type": "module"</code> dans package.json.<br>
      <strong>Renderer</strong> = JavaScript navigateur (peut utiliser <code>&lt;script type="module"&gt;</code>).
    </div>
    ${PROCESS_MODEL}

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

    <h2>2. preload.js (ESM)</h2>
    <pre><code>// preload.js — Pont entre Main et Renderer (ESM)
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
});</code></pre>
    ${PRELOAD_BASIC}

    <h2>3. Configurer main.js</h2>
    <pre><code>const win = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,    // Obligatoire (sécurité)
    nodeIntegration: false,    // Obligatoire (sécurité)
  },
});</code></pre>
    ${WEB_PREFS}

    <h2>4. Utiliser dans index.html</h2>
    <pre><code>&lt;script&gt;
  document.body.innerHTML += \`&lt;p&gt;Electron \${window.electronAPI.versions.electron}&lt;/p&gt;\`;
&lt;/script&gt;</code></pre>
    ${ce('Explication — utilisation dans le Renderer', [
      ['window.electronAPI', 'Objet créé par <code>contextBridge</code> dans preload — accessible comme une variable globale.'],
      ['versions.electron', 'Lit la version Electron exposée par le preload — preuve que le pont fonctionne.'],
      ['Template literal \\`…\\${}…\\`', 'Chaîne JavaScript qui insère une variable dans le HTML.'],
    ])}

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

    <h2>2. preload.js (ESM)</h2>
    <pre><code>import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  sauvegarder: (texte) => ipcRenderer.invoke('save-text', texte),
  lire: () => ipcRenderer.invoke('read-text'),
});</code></pre>
    ${PRELOAD_IPC}

    <h2>3. main.js (ESM)</h2>
    <pre><code>import { app, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

const fichier = path.join(app.getPath('userData'), 'notes.txt');

ipcMain.handle('save-text', (_event, texte) => {
  fs.writeFileSync(fichier, texte, 'utf-8');
  return { ok: true };
});

ipcMain.handle('read-text', () => {
  if (fs.existsSync(fichier)) return fs.readFileSync(fichier, 'utf-8');
  return '';
});</code></pre>
    ${MAIN_IPC}

    <h2>4. index.html</h2>
    <pre><code>&lt;textarea id="editor"&gt;&lt;/textarea&gt;
&lt;button id="save"&gt;Sauvegarder&lt;/button&gt;
&lt;script&gt;
  const editor = document.getElementById('editor');
  window.api.lire().then(t => editor.value = t);
  document.getElementById('save').onclick = () =>
    window.api.sauvegarder(editor.value);
&lt;/script&gt;</code></pre>
    ${HTML_IPC}

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
  <pre><code>// js/navigation.js (Renderer — ESM)
export function allerVers(page) {
  window.location.href = \`pages/\${page}.html\`;
}</code></pre>
    <pre><code>&lt;!-- pages/accueil.html — charger le module ESM --&gt;
&lt;script type="module"&gt;
  import { allerVers } from '../js/navigation.js';
  document.getElementById('btn-params').onclick = () =&gt; allerVers('parametres');
}</code></pre>
    ${NAV_ESM}

    <h2>4. Charger une autre page depuis main.js</h2>
    <pre><code>win.loadFile(path.join(__dirname, 'pages', 'accueil.html'));</code></pre>
    ${ce('Explication — loadFile multi-pages', [
      ['path.join(__dirname, \'pages\', …)', 'Construit le chemin : dossier du projet + sous-dossier <code>pages/</code> + fichier HTML.'],
      ['loadFile(…)', 'Charge cette page comme page d\'accueil au démarrage de la fenêtre.'],
    ])}

    <h2>5. Plusieurs fenêtres (option)</h2>
    <pre><code>function ouvrirParametres() {
  const win = new BrowserWindow({ width: 500, height: 400, parent: mainWindow });
  win.loadFile('pages/parametres.html');
}</code></pre>
    ${ce('Explication — fenêtre secondaire', [
      ['new BrowserWindow({ parent: mainWindow })', 'Crée une fenêtre « enfant » liée à la fenêtre principale.'],
      ['width / height', 'Taille de la fenêtre secondaire (paramètres).'],
      ['loadFile(\'pages/parametres.html\')', 'Charge une page HTML différente dans cette nouvelle fenêtre.'],
    ])}

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
    <h2>1. Menu natif (ESM)</h2>
    <pre><code>import { Menu } from 'electron';

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
    ${MENU_ESM}

    <h2>2. Boîte de dialogue (ESM)</h2>
    <pre><code>import { dialog } from 'electron';

const { response } = await dialog.showMessageBox({
  type: 'question',
  buttons: ['Oui', 'Non'],
  message: 'Enregistrer avant de quitter ?',
});</code></pre>
    ${DIALOG_ESM}

    <h2>3. Exercice</h2>
    <p>Menu Fichier → Quitter avec confirmation si texte non sauvegardé.</p>`,
  },
  {
    file: '09-fichiers', id: '09-fichiers',
    title: 'Chapitre 9 — Ouvrir & enregistrer des fichiers',
    level: 'Intermédiaire', hours: '5h', prereq: 'Chapitre 8',
    body: `
    <h2>1. Dialog Ouvrir / Enregistrer (ESM — dans main.js)</h2>
    <pre><code>import { dialog, ipcMain } from 'electron';
import fs from 'node:fs';

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
    ${DIALOG_FILE}

    <h2>2. preload.js (ESM)</h2>
    <pre><code>import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ouvrir: () => ipcRenderer.invoke('dialog:open'),
  enregistrer: (c) => ipcRenderer.invoke('dialog:save', c),
});</code></pre>
    ${ce('Explication — preload pour fichiers', [
      ['ouvrir: () => ipcRenderer.invoke(…)', 'Expose <code>window.api.ouvrir()</code> — ouvre le dialogue système via le Main.'],
      ['enregistrer: (c) => …', 'Passe le contenu <code>c</code> au Main pour la boîte « Enregistrer sous ».'],
    ])}

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
    ${CSP_META}

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
    ${DEBUG_DEVTOOLS}

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
    ${DEBUG_VSCODE}

    <h2>3. Logs (ESM)</h2>
    <pre><code>npm install electron-log --save
// main.js
import log from 'electron-log';
log.info('Application démarrée');</code></pre>
    ${LOG_ESM}`,
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
    ${JEST_ESM}
    <pre><code>// package.json
"scripts": { "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js" }</code></pre>
    ${ce('Explication — script test Jest ESM', [
      ['--experimental-vm-modules', 'Indispensable pour que Jest comprenne les <code>import</code> ESM.'],
      ['node_modules/jest/bin/jest.js', 'Lance Jest sans installation globale.'],
    ])}

    <h2>3. Tests E2E — Playwright</h2>
    <pre><code>npm install @playwright/test --save-dev
npx playwright install</code></pre>
    ${PLAYWRIGHT_INSTALL}
    <pre><code>// tests/electron.spec.js (ESM)
import { test, expect, _electron as electron } from '@playwright/test';

test('fenêtre principale', async () => {
  const app = await electron.launch({ args: ['.'] });
  const window = await app.firstWindow();
  await expect(window).toHaveTitle(/Ma première app/);
  await window.click('#btn');
  await expect(window.locator('#message')).not.toBeEmpty();
  await app.close();
});</code></pre>
    ${PLAYWRIGHT_ESM}

    <h2>4. Lancer les tests</h2>
    <pre><code>npm test
npx playwright test</code></pre>
    ${TEST_CMDS}

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
    ${BUILD_INSTALL}

    <h2>3. package.json</h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "type": "module",
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
    ${BUILD_PKG}

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
    ${DIST_CMDS}

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

// main.js (ESM)
import { autoUpdater } from 'electron-updater';
import { app } from 'electron';
app.whenReady().then(() => autoUpdater.checkForUpdatesAndNotify());</code></pre>
    ${UPDATER_ESM}
    ${UPDATER_FLOW}

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
    ${ce('Explication — workflow GitHub Actions', [
      ['on.push.tags: [\'v*\']', 'Déclenche le build quand vous poussez un tag Git (ex : v1.0.0).'],
      ['matrix.os', 'Compile sur Linux, Windows et macOS en parallèle.'],
      ['npm ci', 'Installe les dépendances exactement comme le lockfile.'],
      ['npm run dist', 'Produit les installateurs pour chaque OS.'],
      ['action-gh-release', 'Publie les fichiers compilés sur GitHub Releases.'],
    ])}

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
    <h2>Étapes (dans l'ordre)</h2>
    <ol>
      <li><code>npm init -y</code> → vous obtenez <code>"main": "index.js"</code></li>
      <li><code>npm install electron --save-dev</code></li>
      <li>Corriger <code>package.json</code> : <code>"main": "main.js"</code> + <code>"start": "electron ."</code></li>
      <li>Supprimer <code>index.js</code> s'il existe (<code>rm index.js</code>)</li>
      <li>Créer <code>index.html</code> (chapitre 2)</li>
      <li>Créer <code>main.js</code> (chapitre 3)</li>
      <li><code>npm start</code> — vérifier la fenêtre</li>
      <li><code>npm run dist</code> — installateur (chapitre 13)</li>
    </ol>
    <h2>package.json final attendu (ESM)</h2>
    <pre><code>{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "type": "module",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^42.5.0"
  }
}</code></pre>
    ${PKG_FINAL}
    <p>Tous les <code>.js</code> du Main et Preload utilisent <code>import</code> / <code>export</code>.</p>
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
