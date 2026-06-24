/**
 * Blocs d'explication pédagogique — wazabiCode
 * Utilisé par generate-pages.js après chaque exemple de code
 */

/** @param {string} title @param {[string, string][]} rows */
export function ce(title, rows) {
  const body = rows
    .map(([code, desc]) => `      <tr><td><code>${code}</code></td><td>${desc}</td></tr>`)
    .join('\n');
  return `
    <h3 class="explain-title">${title}</h3>
    <table class="explain-table">
      <tr><th>Code</th><th>Ce que ça fait (simplement)</th></tr>
${body}
    </table>`;
}

export const PKG_FINAL = ce('Explication — package.json (champs importants)', [
  ['"name"', 'Nom de votre projet. Utilisé par npm pour l\'identifier.'],
  ['"version"', 'Numéro de version de l\'app (ex : 1.0.0 → 1.0.1 pour une mise à jour).'],
  ['"type": "module"', 'Active les <strong>modules ESM</strong> : dans vos <code>.js</code>, vous écrivez <code>import</code> au lieu de <code>require()</code>.'],
  ['"main": "main.js"', 'Fichier que Electron exécute en premier au lancement — le <strong>Main Process</strong>.'],
  ['"scripts".start', 'Définit la commande <code>npm start</code> → lance <code>electron .</code> (le point = dossier courant).'],
  ['devDependencies', 'Dépendances pour le <em>développement</em> seulement (pas livrées telles quelles à l\'utilisateur).'],
  ['"electron"', 'Le package Electron : contient Chromium + Node.js embarqués pour votre app Desktop.'],
]);

export const CMD_INSTALL = ce('Explication — commandes du terminal', [
  ['mkdir mon-app-electron', 'Crée un nouveau dossier pour isoler votre projet.'],
  ['cd mon-app-electron', 'Entre dans ce dossier — toutes les commandes suivantes s\'y exécutent.'],
  ['npm init -y', 'Crée <code>package.json</code> avec les valeurs par défaut (<code>-y</code> = oui à tout).'],
  ['npm install electron --save-dev', 'Télécharge Electron dans <code>node_modules/</code> et l\'enregistre dans <code>package.json</code>.'],
]);

export const HTML_INDEX = ce('Explication — index.html ligne par ligne', [
  ['&lt;!DOCTYPE html&gt;', 'Indique au navigateur que c\'est un document HTML5.'],
  ['&lt;html lang="fr"&gt;', 'Racine de la page ; <code>lang="fr"</code> = français (accessibilité, SEO).'],
  ['&lt;head&gt;', 'Métadonnées invisibles : titre onglet, encodage, styles.'],
  ['&lt;meta charset="UTF-8"&gt;', 'Encodage des caractères — accents et emojis affichés correctement.'],
  ['&lt;title&gt;', 'Texte affiché dans la barre de titre de la fenêtre Electron.'],
  ['&lt;style&gt;…&lt;/style&gt;', 'CSS intégré : couleurs, marges, style du bouton.'],
  ['&lt;body&gt;', 'Contenu visible par l\'utilisateur.'],
  ['&lt;h1&gt;, &lt;p&gt;', 'Titre principal et paragraphe de bienvenue.'],
  ['&lt;button id="btn"&gt;', 'Bouton cliquable ; <code>id</code> permet de le cibler en JavaScript.'],
  ['&lt;script&gt;…&lt;/script&gt;', 'JavaScript exécuté dans le <strong>Renderer</strong> (comme dans Chrome).'],
  ['getElementById', 'Sélectionne un élément HTML par son <code>id</code>.'],
  ['addEventListener(\'click\')', 'Exécute une fonction quand l\'utilisateur clique.'],
  ['textContent = …', 'Modifie le texte affiché dans l\'élément <code>#message</code>.'],
]);

export const PRELOAD_BASIC = ce('Explication — preload.js', [
  ['import { contextBridge } from \'electron\'', '<code>contextBridge</code> = outil sécurisé pour exposer des données au Renderer.'],
  ['exposeInMainWorld(\'electronAPI\', …)', 'Crée <code>window.electronAPI</code> accessible dans votre HTML — comme une API globale contrôlée.'],
  ['platform: process.platform', 'OS actuel : <code>linux</code>, <code>win32</code> ou <code>darwin</code> (macOS).'],
  ['process.versions.electron', 'Version d\'Electron utilisée — utile pour le débogage.'],
]);

export const WEB_PREFS = ce('Explication — webPreferences dans BrowserWindow', [
  ['preload: path.join(…)', 'Chemin vers <code>preload.js</code> exécuté <em>avant</em> le chargement de la page.'],
  ['contextIsolation: true', 'Isole le code de la page du preload — <strong>obligatoire</strong> pour la sécurité.'],
  ['nodeIntegration: false', 'Interdit au HTML d\'accéder directement à Node.js — évite les failles.'],
]);

export const PRELOAD_IPC = ce('Explication — preload.js (IPC)', [
  ['import { ipcRenderer } from \'electron\'', 'Module pour envoyer des messages du Renderer vers le Main Process.'],
  ['ipcRenderer.invoke(\'save-text\', texte)', 'Appelle le handler <code>save-text</code> dans <code>main.js</code> et attend la réponse.'],
  ['sauvegarder: (texte) => …', 'Fonction exposée au HTML via <code>window.api.sauvegarder()</code>.'],
  ['lire: () => …', 'Fonction exposée via <code>window.api.lire()</code> — retourne une Promise.'],
]);

export const MAIN_IPC = ce('Explication — main.js (handlers IPC)', [
  ['import { ipcMain } from \'electron\'', 'Module pour <em>recevoir</em> les messages envoyés par le Renderer.'],
  ['import fs from \'node:fs\'', 'Module Node.js natif pour lire/écrire des fichiers sur le disque.'],
  ['app.getPath(\'userData\')', 'Dossier système où l\'app peut stocker des données (notes, config).'],
  ['ipcMain.handle(\'save-text\', …)', 'Enregistre un handler : quand le Renderer appelle <code>invoke(\'save-text\')</code>, cette fonction s\'exécute.'],
  ['(_event, texte)', '<code>_event</code> = infos sur l\'événement (souvent ignoré) ; <code>texte</code> = donnée envoyée par le Renderer.'],
  ['fs.writeFileSync(…)', 'Écrit le texte dans le fichier — <code>Sync</code> = synchrone (bloque jusqu\'à la fin).'],
  ['return { ok: true }', 'Renvoie un objet au Renderer — récupérable avec <code>await window.api.sauvegarder()</code>.'],
  ['fs.existsSync / readFileSync', 'Vérifie si le fichier existe, puis lit son contenu en UTF-8.'],
]);

export const HTML_IPC = ce('Explication — index.html (appel IPC)', [
  ['&lt;textarea id="editor"&gt;', 'Zone de saisie multiligne pour le texte des notes.'],
  ['window.api.lire()', 'Appelle le preload → Main → lit le fichier → remplit le textarea au chargement.'],
  ['.then(t => editor.value = t)', 'Quand la lecture est terminée, place le texte dans le textarea.'],
  ['window.api.sauvegarder(editor.value)', 'Envoie le contenu actuel au Main Process pour l\'enregistrer.'],
]);

export const NAV_ESM = ce('Explication — navigation ESM', [
  ['export function allerVers', 'Exporte une fonction réutilisable — autre fichier peut l\'<code>import</code>er.'],
  ['window.location.href = …', 'Change l\'URL affichée dans la fenêtre → charge une autre page HTML.'],
  ['&lt;script type="module"&gt;', 'Indique que le script utilise <code>import</code> (modules ESM côté navigateur).'],
  ['import { allerVers } from …', 'Importe la fonction depuis <code>navigation.js</code>.'],
]);

export const MENU_ESM = ce('Explication — menu natif', [
  ['import { Menu } from \'electron\'', 'API pour créer la barre de menu en haut de la fenêtre (Fichier, Édition…).'],
  ['label: \'Fichier\'', 'Nom du menu affiché dans la barre.'],
  ['submenu: [ … ]', 'Liste des entrées sous ce menu.'],
  ['accelerator: \'CmdOrCtrl+N\'', 'Raccourci clavier : Ctrl+N (Windows/Linux) ou Cmd+N (macOS).'],
  ['click: () => createWindow()', 'Fonction appelée quand l\'utilisateur clique sur cette entrée.'],
  ['{ role: \'quit\' }', 'Entrée prédéfinie Electron pour quitter l\'application.'],
  ['Menu.buildFromTemplate(template)', 'Construit le menu à partir du tableau de configuration.'],
  ['Menu.setApplicationMenu(…)', 'Applique ce menu à toute l\'application.'],
]);

export const DIALOG_ESM = ce('Explication — boîte de dialogue', [
  ['import { dialog } from \'electron\'', 'API pour les fenêtres système : ouvrir, enregistrer, confirmer.'],
  ['await dialog.showMessageBox({…})', 'Affiche une popup avec boutons — <code>await</code> attend le clic utilisateur.'],
  ['type: \'question\'', 'Style icône : point d\'interrogation.'],
  ['buttons: [\'Oui\', \'Non\']', 'Boutons affichés ; l\'index du clic est dans <code>response</code>.'],
]);

export const DIALOG_FILE = ce('Explication — ouvrir / enregistrer fichiers', [
  ['dialog.showOpenDialog', 'Ouvre l\'explorateur « Ouvrir un fichier » natif du système.'],
  ['properties: [\'openFile\']', 'Mode sélection d\'un fichier (pas un dossier).'],
  ['filters: [{ extensions: [\'txt\'] }]', 'Limite les types visibles : fichiers .txt et .md.'],
  ['canceled', '<code>true</code> si l\'utilisateur a annulé — on ne fait rien.'],
  ['filePaths[0]', 'Chemin complet du fichier choisi par l\'utilisateur.'],
  ['dialog.showSaveDialog', 'Ouvre la fenêtre « Enregistrer sous ».'],
  ['filePath', 'Chemin où l\'utilisateur veut sauvegarder.'],
]);

export const CSP_META = ce('Explication — Content Security Policy', [
  ['http-equiv="Content-Security-Policy"', 'En-tête de sécurité : limite ce que la page peut charger.'],
  ['default-src \'self\'', 'Par défaut, seules les ressources du même dossier sont autorisées.'],
  ['script-src \'self\'', 'Les scripts ne peuvent venir que de votre app — pas de CDN externe non contrôlé.'],
]);

export const DEBUG_DEVTOOLS = ce('Explication — DevTools', [
  ['mainWindow.webContents', 'Référence au contenu web de la fenêtre principale.'],
  ['.openDevTools()', 'Ouvre les outils de développement Chrome (inspecteur, console, réseau).'],
]);

export const DEBUG_VSCODE = ce('Explication — launch.json', [
  ['"type": "node"', 'Débogueur Node.js intégré à VS Code.'],
  ['runtimeExecutable: …/electron', 'Lance Electron au lieu de Node.js seul.'],
  ['"args": ["."]', 'Passe le dossier courant à Electron (équivalent de <code>electron .</code>).'],
  ['outputCapture: "std"', 'Affiche les <code>console.log</code> du Main dans le terminal VS Code.'],
]);

export const LOG_ESM = ce('Explication — electron-log', [
  ['import log from \'electron-log\'', 'Module pour écrire des logs dans un fichier et la console.'],
  ['log.info(…)', 'Message d\'information — utile pour tracer le démarrage ou les erreurs.'],
]);

export const JEST_ESM = ce('Explication — test unitaire Jest', [
  ['export function formaterTitre', 'Fonction pure testée — pas besoin d\'Electron pour la tester.'],
  ['import { formaterTitre } from …', 'Import ESM du fichier à tester.'],
  ['test(\'titre vide\', …)', 'Définit un cas de test nommé « titre vide ».'],
  ['expect(…).toBe(…)', 'Vérifie que le résultat est exactement égal à la valeur attendue.'],
]);

export const PLAYWRIGHT_ESM = ce('Explication — test E2E Playwright', [
  ['import { _electron as electron }', 'API Playwright pour lancer et contrôler une app Electron.'],
  ['electron.launch({ args: [\'.\'] })', 'Démarre votre app comme en production.'],
  ['app.firstWindow()', 'Récupère la première fenêtre ouverte.'],
  ['expect(window).toHaveTitle(…)', 'Vérifie que le titre de la fenêtre correspond.'],
  ['window.click(\'#btn\')', 'Simule un clic sur le bouton — comme un utilisateur réel.'],
  ['app.close()', 'Ferme l\'application à la fin du test.'],
]);

export const BUILD_PKG = ce('Explication — package.json (electron-builder)', [
  ['"dist": "electron-builder"', 'Script npm qui compile l\'app en installateur (.exe, .dmg, .AppImage).'],
  ['"build".appId', 'Identifiant unique de l\'app (ex : style nom de domaine inversé).'],
  ['productName', 'Nom affiché à l\'utilisateur dans le menu et l\'installateur.'],
  ['directories.output: "dist"', 'Dossier où les installateurs compilés seront créés.'],
  ['win.target: "nsis"', 'Windows : installateur classique .exe avec assistant.'],
  ['mac.target: "dmg"', 'macOS : image disque .dmg.'],
  ['linux.target: "AppImage"', 'Linux : fichier unique exécutable sans installation.'],
]);

export const UPDATER_ESM = ce('Explication — mise à jour automatique', [
  ['import { autoUpdater } from \'electron-updater\'', 'Module pour vérifier et télécharger les nouvelles versions.'],
  ['checkForUpdatesAndNotify()', 'Contacte le serveur de releases ; notifie l\'utilisateur si une MAJ existe.'],
]);

export const UPDATER_FLOW = ce('Explication — app.whenReady ici', [
  ['app.whenReady().then(…)', 'Attend qu\'Electron soit prêt avant de chercher une mise à jour.'],
  ['On enchaîne après le démarrage', 'La vérification MAJ ne bloque pas l\'affichage de la fenêtre.'],
]);

export const MAIN_MINIMAL = ce('Explication — main.js (version minimale)', [
  ['import { app, BrowserWindow }', 'Importe le gestionnaire d\'app et la classe pour créer des fenêtres.'],
  ['import path / fileURLToPath', 'Construisent <code>__dirname</code> en ESM — dossier du projet.'],
  ['function createWindow()', 'Regroupe la création de fenêtre — réutilisable si l\'app se rouvre sur macOS.'],
  ['new BrowserWindow({ width, height, title })', 'Crée une fenêtre native avec taille et titre définis.'],
  ['win.loadFile(path.join(__dirname, \'index.html\'))', 'Charge votre page HTML dans la fenêtre.'],
  ['app.whenReady().then(createWindow)', 'Attend qu\'Electron soit prêt, puis ouvre la fenêtre.'],
  ['window-all-closed → app.quit()', 'Sur Windows/Linux, quitte l\'app quand toutes les fenêtres sont fermées.'],
  ['activate → createWindow()', 'Sur macOS, recrée une fenêtre si l\'utilisateur clique sur l\'icône du dock.'],
]);

export const PROCESS_MODEL = ce('Explication — où écrire votre code ?', [
  ['main.js + import ESM', 'Main Process : fenêtres, fichiers, menus, IPC — accès Node.js complet.'],
  ['index.html + &lt;script&gt;', 'Renderer : interface visible — comme du JavaScript dans Chrome.'],
  ['preload.js + import ESM', 'Pont sécurisé exécuté avant la page — expose <code>window.api</code>.'],
  ['renderer.js + type="module"', 'JavaScript modulaire côté page — <code>import</code> entre fichiers UI.'],
]);

export const BUILD_INSTALL = ce('Explication — installation electron-builder', [
  ['npm install electron-builder --save-dev', 'Télécharge l\'outil qui compile votre app en installateur.'],
  ['--save-dev', 'Outil de build uniquement — pas nécessaire chez l\'utilisateur final.'],
]);

export const DIST_CMDS = ce('Explication — commandes de compilation', [
  ['npm run dist', 'Compile pour l\'OS sur lequel vous travaillez (Windows, macOS ou Linux).'],
  ['npm run dist:win', 'Force la génération d\'un installateur Windows (.exe).'],
  ['npm run dist:mac', 'Force un .dmg — signature Apple requiert souvent un Mac.'],
  ['npm run dist:linux', 'Force un fichier .AppImage exécutable sur Linux.'],
]);

export const TEST_CMDS = ce('Explication — lancer les tests', [
  ['npm test', 'Exécute Jest — tests unitaires rapides sur vos fonctions JavaScript.'],
  ['npx playwright test', 'Lance les tests E2E — démarre Electron et simule un utilisateur.'],
]);

export const PLAYWRIGHT_INSTALL = ce('Explication — installer Playwright', [
  ['npm install @playwright/test --save-dev', 'Ajoute Playwright comme outil de test dans le projet.'],
  ['npx playwright install', 'Télécharge les navigateurs/Chromium nécessaires aux tests E2E.'],
]);
