# Chapitre 1 — Installation officielle d'Electron

**Source :** [Instructions d'installation avancée — Electron](https://www.electronjs.org/fr/docs/latest/tutorial/installation)

## Installation recommandée

```bash
npm install electron --save-dev
```

## Exécution directe

```bash
npx electron .
```

## Dépannage

| Erreur | Solution |
|--------|----------|
| ELIFECYCLE, ETIMEDOUT | Problème réseau — réessayer, utiliser un miroir |
| EACCESS | Corriger les droits npm |
| Téléchargement lent | `npm install --verbose electron` |

## Miroir

```bash
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" npm install electron --save-dev
```

## CI sans binaire

```bash
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```
