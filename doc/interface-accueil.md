# Interface d'accueil (`/`)

Cette page permet un accès à de divers partie du jeu.
Ici, on donne l'effet d'être sur le bureau d'un système d'exploitation
avec les icônes permettant d'accéder à divers menus.

## Icône "Niveaux"

Cette icône ramène sur la page `/levels` qui liste tous les niveaux
que contient Your ~~Private~~ Life.

Dans la partie haute - header - de la page, on trouve deux élements.

- Une barre de recherche qui permet de faciliter la navigation en recherchant un niveau en particulier grâce à son titre, son ID ou sa description.
- Un bouton "Suggérer un niveau". Ce bouton permettra aux utilisateurs, **dans le futur** car sa fonctionnalité n'a pas encore été développé, de suggérer un niveau à l'équipe de développement et de, pourquoi pas, l'intégrer dans Your ~~Private~~ Life.

Lorsque vous cliquez sur un niveau, vous y serez redirigé (`/levels/:level_id`).

## Icône "Mon Compte"

Cette icône ramène sur la page `/user` qui fait un récapitulatif des données de votre compte, c'est à dire qu'elle liste les niveaux que vous avez terminés.

## Icône "À propos"

Cette icône va ouvrir une fenêtre glissante et fermante - comme dans un envrionnement de bureau.

Elle informe sur ce projet en rapellant les idées clés du projet, le but et la cause de sa création.

## Icône "Déconnexion"

Cette icône ramène sur la page `/logout` qui va automatiquement déconnecter l'utilisateur en faisant une requête HTTP `POST /api/user/logout` qui supprimera les cookies de session.
