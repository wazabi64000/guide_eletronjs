# Electron.js — De zéro à l'exécutable — wazabiCode

Cursus **débutant** basé sur la [documentation officielle Electron](https://www.electronjs.org/fr/docs/latest/).

> La plateforme e-learning est en HTML/CSS/JS. Le **cours** enseigne uniquement **Electron.js**.

---

## Parcours (~70h)

| Étape | Contenu |
|-------|---------|
| **1 — Démarrer** | Installation officielle, première page HTML, main.js |
| **2 — Comprendre** | Main/Renderer, Preload, IPC |
| **3 — Construire** | Plusieurs pages, menus, fichiers |
| **4 — Qualité** | Sécurité, debug, tests Jest + Playwright |
| **5 — Distribuer** | .exe / .dmg / AppImage avec electron-builder |

---

## Références officielles

- [Installation avancée](https://www.electronjs.org/fr/docs/latest/tutorial/installation)
- [Modèle de processus](https://www.electronjs.org/fr/docs/latest/tutorial/process-model)
- [Sécurité](https://www.electronjs.org/fr/docs/latest/tutorial/security)
- [Tutoriel officiel](https://www.electronjs.org/fr/docs/latest/tutorial/tutorial-prerequisites)

---

## Index

| # | Module |
|---|--------|
| 0 | Qu'est-ce qu'Electron ? |
| 1 | Installation officielle (`npm install electron --save-dev`) |
| 2 | Votre première page HTML |
| 3 | Le fichier main.js |
| 4 | Main & Renderer |
| 5 | Script Preload |
| 6 | Communication IPC |
| 7 | Plusieurs pages |
| 8 | Menus & dialogues |
| 9 | Ouvrir & sauvegarder |
| 10 | Sécurité officielle |
| 11 | Déboguer |
| 12 | Tests automatisés |
| 13 | Compiler .exe / .dmg / AppImage |
| 14 | Publier & MAJ auto |

## Projets

1. Hello Electron (packagé)
2. Bloc-notes multi-pages
3. App complète testée & compilée

---

## Régénérer les pages

```bash
node scripts/generate-pages.js --force
```
