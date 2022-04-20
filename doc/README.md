# Bienvenue dans la documentation de Your ~~Private~~ Life !

## Liens

- [Dernier déploiement de YPL](https://your-private-life.vercel.app) ;
- [GitHub](https://github.com/MilesCodeIt/your-private-life)

## Sommaire

1. [Inscription et connexion](./inscription-et-connexion.md)
2. [Introduction](./introduction.md)
3. [Interface de la page d'accueil](./interface-accueil.md)
4. [Niveaux](./niveaux.md)

## Ce qui se passe au premier chargement de l'application (`_app.jsx`)

On récupère les données de l'utilisateur actuel en effectuant la requête HTTP `GET /api/user/me`. Celle-ci renvoie `403` si l'utilisateur n'est pas connecté. Sinon, elle renvoie un statut `200` avec [les valeurs du payload que contient le token](./inscription-et-connexion.md).

Si l'utilisateur est correctement authentifié, on récupère aussi sa progression dans les niveaux grâce à la requête HTTP `GET /api/user/levels`.

[La progression d'un niveau est booléen](./niveaux.md). S'il est terminé, sa valeur est `true`, sinon `false`.

Une fois que tout ça a été chargé, on modifie l'état du chargement en `false` ce qui a pour effet d'arrêter l'animation de chargement de l'application.


