# Chapitre 0 — Introduction : Applications Web, Desktop et Electron

**Durée estimée : 8 heures** | **Niveau : Tous** | **Prérequis : Aucun**

---

## 1. Objectifs pédagogiques

À l'issue de ce chapitre, vous serez capable de :

- Définir ce qu'est une application Web et une application Desktop
- Expliquer le rôle d'Electron dans l'écosystème des applications cross-platform
- Décrire l'architecture Main Process / Renderer Process / Preload
- Lister les avantages, inconvénients et cas d'usage d'Electron
- Comparer Electron avec Tauri, Flutter et Neutralino
- Choisir la technologie adaptée à un besoin métier donné
- Comprendre le parcours complet de cette formation

---

## 2. Théorie détaillée

### 2.1 Qu'est-ce qu'une application Web ?

Une **application Web** est un logiciel accessible via un **navigateur** (Chrome, Firefox, Safari, Edge). L'utilisateur tape une adresse URL ou clique sur un lien ; le navigateur télécharge des fichiers (HTML, CSS, JavaScript) et les exécute pour afficher une interface interactive.

**Caractéristiques clés :**

| Aspect | Description |
|--------|-------------|
| **Distribution** | Aucune installation requise (sauf PWA) |
| **Mise à jour** | Instantanée côté serveur |
| **Accès** | Multi-plateforme via navigateur |
| **Sécurité** | Sandbox du navigateur (same-origin policy) |
| **Hors-ligne** | Limité (Service Workers, PWA) |

**Exemples :** Gmail, Notion (version web), GitHub, Figma.

Une application Web moderne repose sur trois piliers :

1. **HTML** — Structure et contenu sémantique
2. **CSS** — Présentation, mise en page, responsive design
3. **JavaScript** — Interactivité, logique métier côté client, appels API

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATEUR WEB                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    HTML     │  │     CSS     │  │    JavaScript       │  │
│  │  Structure  │  │   Style     │  │   Interactivité     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│              ┌───────────────────────┐                       │
│              │   Moteur de rendu     │                       │
│              │   (Blink, Gecko…)     │                       │
│              └───────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼ HTTP/HTTPS
              ┌───────────────────────┐
              │   Serveur Web + API   │
              │   (Node.js, PHP…)     │
              └───────────────────────┘
```

### 2.2 Qu'est-ce qu'une application Desktop ?

Une **application Desktop** s'installe directement sur le système d'exploitation de l'utilisateur (Windows, macOS, Linux). Elle a accès aux ressources locales : fichiers, imprimantes, notifications système, base de données locale, etc.

**Caractéristiques clés :**

| Aspect | Description |
|--------|-------------|
| **Distribution** | Installateur (.exe, .dmg, .AppImage) |
| **Mise à jour** | Via auto-update ou téléchargement manuel |
| **Performance** | Accès direct au OS, pas de sandbox navigateur |
| **Hors-ligne** | Fonctionnement natif sans connexion |
| **Intégration OS** | Barre des tâches, raccourcis, menus système |

**Exemples natifs :** Microsoft Word, Adobe Photoshop, VLC.

**Exemples cross-platform (Electron, etc.) :** VS Code, Slack, Discord, Notion Desktop.

### 2.3 Qu'est-ce qu'Electron ?

**Electron** est un framework open source créé par GitHub (2013) qui permet de construire des applications Desktop en utilisant des technologies Web : **HTML, CSS et JavaScript**.

Electron combine deux briques fondamentales :

1. **Chromium** — Le moteur de rendu de Google Chrome (affiche l'interface)
2. **Node.js** — Runtime JavaScript côté serveur (accès fichiers, réseau, OS)

> **Définition officielle :** Electron permet d'embarquer Chromium et Node.js dans une seule application exécutable.

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION ELECTRON                          │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────────────┐ │
│  │    MAIN PROCESS      │    │     RENDERER PROCESS(ES)      │ │
│  │    (Node.js)         │◀──▶│     (Chromium)                │ │
│  │                      │IPC │                               │ │
│  │  • Fenêtres          │    │  • HTML / CSS / JS            │ │
│  │  • Menu natif        │    │  • Interface utilisateur      │ │
│  │  • Accès fichiers    │    │  • DevTools                   │ │
│  │  • SQLite            │    │                               │ │
│  └──────────────────────┘    └──────────────────────────────┘ │
│              │                              │                    │
│              └────────── PRELOAD ──────────┘                    │
│                    (pont sécurisé)                               │
└─────────────────────────────────────────────────────────────────┘
```

### 2.4 Comment fonctionne Electron ?

#### Le Main Process (processus principal)

- Point d'entrée : fichier `main.js` (ou `main.ts`)
- Un seul Main Process par application
- Gère le cycle de vie : création de fenêtres, menus, tray icon
- Accès complet à Node.js et aux APIs Electron (`app`, `BrowserWindow`, `ipcMain`)
- Ne affiche pas directement d'interface graphique

#### Le Renderer Process (processus de rendu)

- Un Renderer Process par fenêtre (onglet Chromium)
- Affiche le HTML/CSS/JS de l'interface
- Par défaut, **pas d'accès direct à Node.js** (sécurité)
- Communique avec le Main via IPC (Inter-Process Communication)

#### Le Preload Script

- Script exécuté **avant** le chargement de la page
- Pont sécurisé entre Renderer et Main
- Expose une API limitée via `contextBridge.exposeInMainWorld()`
- Empêche l'injection de code malveillant

#### Flux de démarrage typique

```
1. Utilisateur lance l'app (.exe / .app / AppImage)
         │
         ▼
2. Node.js démarre le Main Process (main.js)
         │
         ▼
3. app.whenReady() → création BrowserWindow
         │
         ▼
4. Chargement preload.js + index.html
         │
         ▼
5. Renderer affiche l'interface
         │
         ▼
6. IPC : Renderer ↔ Main pour actions système
```

### 2.5 Avantages et inconvénients d'Electron

#### Avantages

| Avantage | Détail |
|----------|--------|
| **Stack Web** | Réutilise HTML/CSS/JS — compétences transférables |
| **Cross-platform** | Un codebase → Windows, macOS, Linux |
| **Écosystème riche** | npm, millions de packages |
| **Rapidité de développement** | Prototypage rapide, hot reload |
| **DevTools** | Chrome DevTools intégrés pour le débogage |
| **Communauté** | Documentation, tutoriels, VS Code comme référence |
| **Mises à jour** | electron-updater pour auto-update |

#### Inconvénients

| Inconvénient | Détail |
|--------------|--------|
| **Taille** | ~150–200 Mo minimum (Chromium embarqué) |
| **Consommation RAM** | Chaque fenêtre = processus Chromium |
| **Performance** | Inférieure aux apps natives (C++, Rust) |
| **Sécurité** | Surface d'attaque si mal configuré (nodeIntegration) |
| **Look natif** | Interface Web, pas toujours « natif OS » |

### 2.6 Cas d'usage

Electron excelle quand :

- L'équipe maîtrise déjà le Web
- L'application nécessite une UI riche et complexe
- Le cross-platform est prioritaire
- L'accès fichiers / base locale / offline est requis
- Le time-to-market prime sur la performance brute

**Applications célèbres :**

- **VS Code** — Éditeur de code (référence architecture Electron)
- **Slack** — Messagerie professionnelle
- **Discord** — Communication gaming
- **Figma Desktop** — Design collaboratif
- **Obsidian** — Prise de notes avec Markdown
- **1Password** — Gestionnaire de mots de passe

### 2.7 Comparaison avec Tauri

**Tauri** (Rust + WebView système) utilise la WebView native de l'OS au lieu d'embarquer Chromium.

```
┌──────────────────┬─────────────────────┬─────────────────────┐
│    Critère       │      Electron       │       Tauri         │
├──────────────────┼─────────────────────┼─────────────────────┤
│ Moteur UI        │ Chromium embarqué   │ WebView OS native   │
│ Backend          │ Node.js             │ Rust                │
│ Taille binaire   │ ~150 Mo+            │ ~5–15 Mo            │
│ RAM              │ Élevée              │ Faible              │
│ Courbe apprent.  │ JS uniquement       │ JS + Rust (option)  │
│ Maturité         │ Très mature (2013)  │ Jeune mais actif    │
│ Écosystème npm   │ Complet             │ Partiel             │
│ Sécurité         │ Bonne si configurée │ Excellente (Rust)   │
└──────────────────┴─────────────────────┴─────────────────────┘
```

**Choisir Tauri si :** taille et performance critiques, équipe OK avec Rust, WebView suffisante.

**Choisir Electron si :** écosystème npm, DevTools Chromium, équipe 100 % JS.

### 2.8 Comparaison avec Flutter

**Flutter** (Google) utilise le langage Dart et son propre moteur de rendu (Skia/Impeller).

```
┌──────────────────┬─────────────────────┬─────────────────────┐
│    Critère       │      Electron       │       Flutter       │
├──────────────────┼─────────────────────┼─────────────────────┤
│ Langage UI       │ HTML/CSS/JS         │ Dart + widgets      │
│ Desktop          │ Oui (mature)        │ Oui (desktop récent)│
│ Mobile           │ Non recommandé      │ Excellent           │
│ Rendu            │ Chromium            │ Moteur propre       │
│ Look             │ Web                   │ Material/Cupertino  │
│ Réutilisation Web│ Directe             │ Compilation native  │
└──────────────────┴─────────────────────┴─────────────────────┘
```

**Choisir Flutter si :** app mobile + desktop, UI custom pixel-perfect, pas de dépendance Web.

**Choisir Electron si :** stack Web existante, app desktop principalement, intégration WebView/HTML.

### 2.9 Comparaison avec Neutralino

**Neutralino** est un framework léger utilisant la WebView système et un binaire minimal.

```
┌──────────────────┬─────────────────────┬─────────────────────┐
│    Critère       │      Electron       │    Neutralino       │
├──────────────────┼─────────────────────┼─────────────────────┤
│ Taille           │ ~150 Mo+            │ ~2–5 Mo             │
│ Runtime          │ Node.js + Chromium  │ Binaire C++ léger   │
│ API              │ Très riche          │ Limitée             │
│ Écosystème       │ npm complet         │ Restreint           │
│ Cas d'usage      │ Apps pro complexes  │ Apps simples/légères│
└──────────────────┴─────────────────────┴─────────────────────┘
```

### 2.10 Quand utiliser Electron ?

**Utilisez Electron quand :**

✅ Votre équipe connaît JavaScript/TypeScript  
✅ Vous visez Windows + macOS + Linux  
✅ Vous avez besoin de SQLite, fichiers locaux, offline  
✅ L'UI est riche (tableaux, éditeurs, dashboards)  
✅ Vous voulez itérer rapidement  
✅ La taille du binaire n'est pas bloquante  

**Évitez Electron quand :**

❌ Application mobile uniquement  
❌ Performance temps réel critique (jeux 3D, audio pro)  
❌ Binaire < 10 Mo obligatoire  
❌ Intégration OS profonde (drivers, kernel)  

**Arbre de décision :**

```
                    Besoin d'une app Desktop ?
                              │
                    ┌─────────┴─────────┐
                    │ OUI               │ NON → App Web ou Mobile
                    ▼
            Équipe maîtrise le Web ?
                    │
          ┌─────────┴─────────┐
          │ OUI               │ NON → Flutter / natif
          ▼
    UI complexe + npm + offline ?
                    │
          ┌─────────┴─────────┐
          │ OUI               │ NON → Tauri / Neutralino
          ▼
              ELECTRON ✓
```

---

## 3. Schémas explicatifs ASCII

### Architecture complète visée en fin de formation

```
┌────────────────────────────────────────────────────────────────────────┐
│                     APPLICATION DESKTOP EXPERT                          │
├────────────────────────────────────────────────────────────────────────┤
│  UI Layer          │  React/Vanilla HTML+CSS+JS dans Renderer         │
├────────────────────┼───────────────────────────────────────────────────┤
│  Preload           │  contextBridge → API sécurisée (db, auth, fs)      │
├────────────────────┼───────────────────────────────────────────────────┤
│  Main Process      │  Fenêtres, menus, IPC handlers, services           │
├────────────────────┼───────────────────────────────────────────────────┤
│  Data Layer        │  SQLite (better-sqlite3) — persistance locale      │
├────────────────────┼───────────────────────────────────────────────────┤
│  Sync Layer        │  API REST + JWT + queue offline                    │
├────────────────────┼───────────────────────────────────────────────────┤
│  Ops Layer         │  Tests Jest/Playwright, electron-builder, CI/CD    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Exemple simple — Hello Electron (aperçu)

> Ce code sera approfondi au Module 9. Ici, illustration du concept.

**main.js** (Main Process) :

```javascript
// main.js — Point d'entrée Electron (Main Process)
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,      // Sécurité : isoler le contexte
      nodeIntegration: false,      // Sécurité : pas de Node dans le renderer
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
```

**index.html** (Renderer) :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon App Electron</title>
</head>
<body>
  <h1>Bienvenue dans Electron</h1>
  <p id="version"></p>
  <script>
    // API exposée par preload.js
    document.getElementById('version').textContent =
      `Electron ${window.electronAPI.versions.electron}`;
  </script>
</body>
</html>
```

---

## 5. Exemple intermédiaire — Communication IPC (aperçu)

```javascript
// preload.js — Pont sécurisé
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  lireFichier: (chemin) => ipcRenderer.invoke('fs:read', chemin),
  versions: {
    electron: process.versions.electron,
    node: process.versions.node,
  },
});
```

```javascript
// main.js — Handler IPC
import { ipcMain } from 'electron';
import fs from 'node:fs/promises';

ipcMain.handle('fs:read', async (_event, chemin) => {
  return fs.readFile(chemin, 'utf-8');
});
```

---

## 6. Exemple avancé — Vision architecture SaaS (aperçu Module Expert)

```
src/
├── main/
│   ├── index.ts              # Bootstrap Electron
│   ├── windows/              # Gestion fenêtres
│   ├── ipc/                  # Handlers IPC par domaine
│   └── services/
│       ├── database.service.ts
│       ├── sync.service.ts
│       └── auth.service.ts
├── preload/
│   └── index.ts              # contextBridge API
└── renderer/
    ├── index.html
    ├── styles/
    ├── components/
    └── pages/
        ├── dashboard/
        ├── settings/
        └── login/
```

---

## 7. Exercices

### Exercice 1 — Classification (15 min)

Classez chaque application : **Web**, **Desktop natif**, **Desktop Electron**, ou **Mobile**.

1. Spotify (navigateur)
2. VS Code
3. Calculatrice Windows
4. Instagram (app store)
5. Notion Desktop
6. Google Docs (navigateur)

### Exercice 2 — Analyse critique (30 min)

Pour un **gestionnaire de factures** destiné aux artisans (offline, PDF, ~500 utilisateurs), rédigez 10 critères et scorez Electron / Tauri / Flutter sur 5.

### Exercice 3 — Schéma (20 min)

Dessinez sur papier ou outil de votre choix le flux : clic bouton « Enregistrer » → SQLite, en passant par Renderer, Preload, Main.

---

## 8. Corrections détaillées

### Correction Exercice 1

| Application | Type |
|-------------|------|
| Spotify (navigateur) | Web |
| VS Code | Desktop Electron |
| Calculatrice Windows | Desktop natif |
| Instagram | Mobile |
| Notion Desktop | Desktop Electron |
| Google Docs (navigateur) | Web |

### Correction Exercice 2 (exemple de grille)

| Critère | Electron | Tauri | Flutter |
|---------|----------|-------|---------|
| Offline + SQLite | 5 | 5 | 4 |
| Export PDF (libs npm) | 5 | 3 | 3 |
| Time-to-market | 5 | 3 | 3 |
| Taille installateur | 2 | 5 | 4 |
| Courbe JS seul | 5 | 4 | 2 |

**Conclusion type :** Electron recommandé — équipe JS, libs PDF matures, offline prioritaire.

### Correction Exercice 3

```
[Clic Enregistrer]
       │
       ▼
Renderer : collecte données formulaire
       │
       ▼
window.api.saveInvoice(data)  ← preload
       │
       ▼
ipcRenderer.invoke('db:save', data)
       │
       ▼
Main : ipcMain.handle('db:save') → better-sqlite3 INSERT
       │
       ▼
Retour { success: true, id: 42 } → Renderer met à jour UI
```

---

## 9. Quiz

**Q1.** Quels deux projets open source Electron combine-t-il ?  
a) Firefox et Python  
b) Chromium et Node.js ✓  
c) WebKit et Deno  

**Q2.** Où s'exécute `main.js` ?  
a) Renderer Process  
b) Main Process ✓  
c) Preload Script  

**Q3.** Pourquoi `nodeIntegration: false` ?  
a) Performance  
b) Sécurité — empêcher l'exécution Node arbitraire dans le renderer ✓  
c) Compatibilité macOS  

**Q4.** Quel outil utilise la WebView système plutôt que Chromium ?  
a) Electron  
b) Tauri ✓  
c) VS Code  

**Q5.** IPC signifie :  
a) Internet Protocol Control  
b) Inter-Process Communication ✓  
c) Internal Package Cache  

**Q6.** Quelle app N'EST PAS basée sur Electron ?  
a) Slack  
b) Discord  
c) Microsoft Word ✓  

**Q7.** Le preload script s'exécute :  
a) Après le chargement complet de la page  
b) Avant le chargement du contenu web, avec accès limité ✓  
c) Uniquement en mode développement  

**Q8.** Principal inconvénient d'Electron ?  
a) Pas de support Linux  
b) Taille et consommation mémoire ✓  
c) Pas d'accès fichiers  

---

## 10. Bonnes pratiques

- Toujours activer `contextIsolation: true` et désactiver `nodeIntegration`
- Exposer le minimum d'API via `contextBridge`
- Séparer Main (logique système) et Renderer (UI)
- Documenter les choix technologiques (ADR — Architecture Decision Records)
- Évaluer les alternatives avant de figer Electron

---

## 11. Erreurs fréquentes

| Erreur | Conséquence | Solution |
|--------|-------------|----------|
| `nodeIntegration: true` partout | Failles XSS critiques | Preload + contextBridge |
| Tout coder dans main.js | Code ingérable | Modules séparés |
| Ignorer les mises à jour Electron | CVE non patchées | Dependabot, npm audit |
| Choisir Electron pour une app mobile | Mauvaise UX | PWA ou Flutter |
| Sous-estimer la taille du build | Insatisfaction utilisateurs | electron-builder, compression |

---

## 12. Challenge de fin de chapitre

**Durée : 2 heures**

Rédigez un document de **5 pages maximum** « Cahier des charges technique » pour une application de votre choix (ex : gestionnaire de bibliothèque personnelle) incluant :

1. Contexte métier
2. Web vs Desktop — justification
3. Electron vs alternatives — tableau comparatif
4. Architecture prévisionnelle (schéma ASCII)
5. Stack technique retenue
6. Risques et mitigations

**Critères d'évaluation :** clarté, justification argumentée, schéma cohérent.

---

## Ressources complémentaires

- [Documentation officielle Electron](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle) — bac à sable
- [Awesome Electron](https://github.com/sindresorhus/awesome-electron)

**Module suivant →** [01-installation.md](./01-installation.md)
