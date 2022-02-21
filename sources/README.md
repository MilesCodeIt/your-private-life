# Your ~~Private~~ Life

## Développement

### Prérequis

- Node.js (v14.x)
- Yarn (v1.x)
- Une base de données MongoDB

### Installation

```bash
# Installation des dépendances
$ yarn 

# Copie du fichier de configuration
$ cp .env.example .env.local
```

Editez le fichier `.env.local` pour configurer la base de données à utiliser. Possibilité de faire `vercel env pull` si le projet est lié avec le projet Vercel. 

### Développement

```bash
yarn dev
```

Ceci démarrera le serveur web sur le port 3000. L'édtion des fichiers des pages sera automatiquement répercutée sur le serveur.

Les pages se trouvent dans le dossier `./pages` et les [routes API](https://nextjs.org/docs/api-routes/introduction) se trouvent dans `./pages/api`.

## Production

Nous utilisons [Vercel](https://vercel.com) pour faire le déploiement du site Internet.

Pour effectuer le build, il faut utiliser `yarn build` et le site sera construit dans le dossier `./build`.

## Conseils de développement

- Utiliser Visual Studio Code (la configuration est déjà faite: `.vscode`) et installer les extensions recommandées (configurées dans: `.vscode/extensions.json`).
- Lint avec `yarn lint` avant de commit (`yarn lint --fix` pour corriger les erreurs de code-style).
