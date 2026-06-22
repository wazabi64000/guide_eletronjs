# Module 1 — Environnement de développement Electron

**Durée : 6 heures** | **Niveau : Débutant** | **Prérequis : Chapitre 0 + bases HTML/CSS/JS**

---

## Objectifs

- Installer Node.js LTS, VS Code, Git, Chrome
- Initialiser un projet npm pour Electron
- Configurer `package.json` et le script `electron .`
- Lancer electron-quick-start

## Outils

| Outil | Rôle |
|-------|------|
| Node.js LTS | Runtime Electron + npm |
| VS Code | Édition et debug |
| Git | Versionnement |
| Chrome DevTools | Debug Renderer (Chromium) |

## Premier projet

```bash
mkdir mon-app-electron && cd mon-app-electron
npm init -y
npm install electron --save-dev
```

## package.json

```json
{
  "main": "main.js",
  "type": "module",
  "scripts": { "start": "electron ." }
}
```

## Structure

```
mon-app-electron/
├── main.js
├── preload.js
├── index.html
├── renderer.js
└── package.json
```
