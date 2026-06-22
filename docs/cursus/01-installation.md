# Module 1 — Installation & Environnement de Développement

**Durée estimée : 12 heures** | **Niveau : Débutant** | **Prérequis : Chapitre 0**

---

## 1. Objectifs pédagogiques

- Installer et configurer VS Code, Node.js, Git, SQLite et Chrome
- Utiliser le terminal en ligne de commande
- Comprendre npm, `package.json` et la structure d'un projet Node.js
- Exécuter votre premier script JavaScript
- Initialiser un dépôt Git et effectuer un premier commit

---

## 2. Théorie détaillée

### 2.1 Visual Studio Code

VS Code est un éditeur de code gratuit, open source, développé par Microsoft. Il est devenu la référence pour le développement JavaScript/Electron.

**Extensions recommandées :**

| Extension | Utilité |
|-----------|---------|
| ESLint | Qualité du code JavaScript |
| Prettier | Formatage automatique |
| GitLens | Historique Git enrichi |
| Live Server | Prévisualisation HTML |
| SQLite Viewer | Inspection bases SQLite |

### 2.2 Node.js

Node.js est un **runtime JavaScript** qui exécute JavaScript en dehors du navigateur. Il inclut **npm** (Node Package Manager).

```
┌─────────────────────────────────────────┐
│              NODE.JS                     │
│  ┌─────────────┐    ┌─────────────────┐ │
│  │   V8 Engine │    │   libuv         │ │
│  │  (Google)   │    │  (I/O async)    │ │
│  └─────────────┘    └─────────────────┘ │
│  ┌─────────────────────────────────────┐ │
│  │  npm — gestionnaire de packages     │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Installation :** Télécharger la version LTS sur [nodejs.org](https://nodejs.org). Vérifier :

```bash
node --version   # v22.x.x ou supérieur
npm --version    # 10.x.x ou supérieur
```

### 2.3 Git

Git est un système de **contrôle de version distribué**. Il trace l'historique du code, permet le travail en équipe et le retour en arrière.

```bash
git --version
git config --global user.name "Votre Nom"
git config --global user.email "vous@email.com"
```

### 2.4 SQLite

SQLite est une base de données **embarquée**, sans serveur, stockée dans un fichier `.db`. Idéale pour les applications Electron offline.

```bash
sqlite3 --version
```

### 2.5 Chrome

Chrome sert à :
- Tester les pages Web
- Utiliser les **DevTools** (débogage, réseau, performance)
- Déboguer le Renderer Process Electron (Chromium)

### 2.6 Le Terminal

Le terminal (bash sur Linux, Terminal sur macOS, PowerShell/WSL sur Windows) permet d'exécuter des commandes textuelles.

**Commandes essentielles :**

| Commande | Action |
|----------|--------|
| `pwd` | Afficher le répertoire courant |
| `ls` / `dir` | Lister les fichiers |
| `cd dossier` | Changer de répertoire |
| `mkdir nom` | Créer un dossier |
| `touch fichier` | Créer un fichier (Linux/macOS) |
| `cat fichier` | Afficher le contenu |
| `clear` | Effacer l'écran |

### 2.7 npm et package.json

**npm** installe et gère les dépendances JavaScript.

```bash
npm init -y          # Créer package.json
npm install lodash   # Installer une dépendance
npm install -D jest  # Dépendance de développement
```

**Structure `package.json` :**

```json
{
  "name": "mon-projet",
  "version": "1.0.0",
  "description": "Mon premier projet",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "keywords": [],
  "author": "Votre Nom",
  "license": "MIT"
}
```

### 2.8 Structure d'un projet

```
mon-projet/
├── node_modules/     # Dépendances (ne pas versionner)
├── src/              # Code source
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

**.gitignore minimal :**

```
node_modules/
.env
*.db
dist/
```

---

## 3. Schémas explicatifs ASCII

```
Workflow développeur débutant :

  [Éditeur VS Code] ──écrit──▶ [fichiers .js / .html]
         │
         ▼
  [Terminal : node index.js]
         │
         ▼
  [Sortie console / navigateur]
         │
         ▼
  [Git commit] ──▶ [Historique versionné]
```

---

## 4. Exemple simple — Hello World

**index.js :**

```javascript
// index.js — Premier script JavaScript
// Le mot-clé console.log affiche du texte dans le terminal

console.log('Bonjour, monde !');
console.log('Node.js version :', process.version);
```

Exécution :

```bash
node index.js
```

---

## 5. Exemple intermédiaire — Script avec entrées

**greeter.js :**

```javascript
// greeter.js — Interaction avec les arguments de ligne de commande

const args = process.argv.slice(2); // Ignore 'node' et le nom du fichier
const prenom = args[0] ?? 'Visiteur';

/**
 * Génère un message de bienvenue personnalisé.
 * @param {string} nom - Prénom de l'utilisateur
 * @returns {string}
 */
function saluer(nom) {
  const heure = new Date().getHours();
  const moment = heure < 12 ? 'matin' : heure < 18 ? 'après-midi' : 'soir';
  return `Bon ${moment}, ${nom} ! Bienvenue dans le cursus Electron.`;
}

console.log(saluer(prenom));
```

```bash
node greeter.js Alice
# Bon après-midi, Alice ! Bienvenue dans le cursus Electron.
```

---

## 6. Exemple avancé — Structure modulaire ES Modules

**src/utils/math.js :**

```javascript
/**
 * @param {number[]} nombres
 * @returns {number}
 */
export function moyenne(nombres) {
  if (nombres.length === 0) return 0;
  const somme = nombres.reduce((acc, n) => acc + n, 0);
  return somme / nombres.length;
}

export function maximum(nombres) {
  return Math.max(...nombres);
}
```

**src/index.js :**

```javascript
import { moyenne, maximum } from './utils/math.js';

const notes = [12, 15, 18, 14, 16];

console.log(`Moyenne : ${moyenne(notes).toFixed(2)}`);
console.log(`Maximum : ${maximum(notes)}`);
```

**package.json** (ajouter `"type": "module"`).

---

## 7. Exercices

### Exercice 1 (30 min)
Installez Node.js, Git et VS Code. Créez un dossier `formation-js` et initialisez Git + npm.

### Exercice 2 (45 min)
Écrivez `calcul-aire.js` qui calcule l'aire d'un rectangle (largeur et hauteur en arguments CLI).

### Exercice 3 (1 h)
Créez une structure `src/` avec un module `stringUtils.js` exportant `majuscules()` et `compterMots()`, et un `index.js` qui les utilise.

---

## 8. Corrections détaillées

### Correction Exercice 2

```javascript
// calcul-aire.js
const largeur = Number(process.argv[2]);
const hauteur = Number(process.argv[3]);

if (Number.isNaN(largeur) || Number.isNaN(hauteur)) {
  console.error('Usage: node calcul-aire.js <largeur> <hauteur>');
  process.exit(1);
}

const aire = largeur * hauteur;
console.log(`Aire du rectangle : ${aire} unités²`);
```

### Correction Exercice 3

```javascript
// src/stringUtils.js
export function majuscules(texte) {
  return texte.toUpperCase();
}

export function compterMots(texte) {
  return texte.trim().split(/\s+/).filter(Boolean).length;
}
```

```javascript
// src/index.js
import { majuscules, compterMots } from './stringUtils.js';

const phrase = 'Hello Electron formation';
console.log(majuscules(phrase));
console.log(`Mots : ${compterMots(phrase)}`);
```

---

## 9. Quiz

**Q1.** Quelle commande initialise un dépôt Git ? → `git init`  
**Q2.** Que contient `node_modules/` ? → Les packages npm installés  
**Q3.** `"type": "module"` permet ? → D'utiliser `import/export` ES6  
**Q4.** LTS signifie ? → Long Term Support  
**Q5.** Faut-il versionner `node_modules` ? → Non  

---

## 10. Bonnes pratiques

- Utiliser la version **LTS** de Node.js
- Toujours avoir un `.gitignore` avant le premier commit
- Nommer les scripts npm dans `package.json` (`start`, `dev`, `test`)
- Organiser le code dans `src/` dès le début
- Documenter le projet dans `README.md`

---

## 11. Erreurs fréquentes

| Erreur | Solution |
|--------|----------|
| `command not found: node` | Réinstaller Node.js, vérifier PATH |
| `Cannot use import outside a module` | Ajouter `"type": "module"` |
| Committer `node_modules` | Ajouter au `.gitignore` |
| Oublier `git config user.email` | Configurer avant le premier commit |
| Confondre `npm install` et `npm install -g` | `-g` = global système |

---

## 12. Challenge de fin de chapitre

**Projet CLI « Carnet de notes terminal » (3 h)**

Créez une application en ligne de commande qui :
1. Ajoute une note (`node notes.js add "Mon texte"`)
2. Liste les notes (`node notes.js list`)
3. Sauvegarde dans `notes.json`
4. Utilise une structure modulaire (`src/commands/`, `src/storage.js`)
5. Est versionnée avec Git (minimum 3 commits)

**Module suivant →** [02-html5.md](./02-html5.md)
