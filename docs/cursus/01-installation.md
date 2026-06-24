# Chapitre 1 — Installation officielle d'Electron

**Source :** [Instructions d'installation avancée — Electron](https://www.electronjs.org/fr/docs/latest/tutorial/installation)

## Installation

```bash
mkdir mon-app-electron && cd mon-app-electron
npm init -y
npm install electron --save-dev
```

## ⚠️ Corriger package.json immédiatement

`npm init -y` met par défaut `"main": "index.js"`. Electron cherche ce fichier et plante.

```json
{
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^33.0.0"
  }
}
```

## Ordre du cours

1. Chapitre 1 — install + corriger `package.json`
2. Chapitre 2 — créer `index.html`
3. Chapitre 3 — créer `main.js` → `npm start`

**Ne pas lancer `npx electron .` avant le chapitre 3.**

## Erreur : Cannot find module index.js

| Cause | Solution |
|-------|----------|
| `"main": "index.js"` dans package.json | Changer en `"main": "main.js"` |
| `main.js` n'existe pas | Créer `main.js` (chapitre 3) |

## Dépannage réseau

```bash
npm install --verbose electron
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" npm install electron --save-dev
```
