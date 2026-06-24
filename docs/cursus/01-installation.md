# Chapitre 1 — Installation officielle d'Electron

**Source :** [Installation avancée — Electron](https://www.electronjs.org/fr/docs/latest/tutorial/installation)

## Commandes

```bash
mkdir mon-app-electron && cd mon-app-electron
npm init -y
npm install electron --save-dev
```

## Après `npm init -y` (réel)

```json
{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Après `npm install electron --save-dev`

Ajout de `devDependencies.electron`. Le champ `"main": "index.js"` est **toujours incorrect** pour Electron.

## Correction obligatoire

| Champ | Avant | Après |
|-------|-------|-------|
| `main` | `index.js` | `main.js` |
| `scripts` | seulement `test` | + `"start": "electron ."` |

```json
{
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^42.5.0"
  }
}
```

**Ne pas créer `index.js`.** Supprimer si présent : `rm index.js`

## Fil conducteur

| Chapitre | Fichier créé | `npm start` |
|----------|--------------|-------------|
| 1 | package.json corrigé | ❌ |
| 2 | index.html | ❌ (main.js manquant) |
| 3 | main.js | ✅ |

## Piège : index.js vs index.html vs main.js

- `index.js` → entrée Node par défaut de npm (ne pas utiliser)
- `index.html` → interface utilisateur (chapitre 2)
- `main.js` → entrée Electron (chapitre 3)
