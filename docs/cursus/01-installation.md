# Chapitre 1 — Installation officielle d'Electron (ESM)

**Source :** [Installation](https://www.electronjs.org/fr/docs/latest/tutorial/installation) · [ESM dans Electron](https://www.electronjs.org/fr/docs/latest/tutorial/esm)

> Ce cours utilise **uniquement les modules ESM** (`import` / `export`), pas CommonJS (`require`).

## Commandes

```bash
mkdir mon-app-electron && cd mon-app-electron
npm init -y
npm install electron --save-dev
```

## package.json corrigé (obligatoire)

```json
{
  "name": "mon-app-electron",
  "version": "1.0.0",
  "description": "Ma première app Electron",
  "type": "module",
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

| Champ | Valeur | Pourquoi |
|-------|--------|----------|
| `type` | `"module"` | Active `import` / `export` |
| `main` | `"main.js"` | Point d'entrée Electron (pas `index.js`) |

## main.js (ESM)

```javascript
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({ width: 900, height: 600 });
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);
```

## Erreurs courantes

| Erreur | Solution |
|--------|----------|
| `Cannot find module index.js` | `"main": "main.js"` |
| `require is not defined` | `"type": "module"` + `import` |
| `Cannot find module main.js` | Créer main.js (chapitre 3) |
