# Inscription et connexion

## Inscription (`/signup`)

Pour vous inscrire, allez sur la page d'inscription `/signup` et saisissez
un nom d'utilisateur ainsi qu'un mot de passe que vous n'oublierez pas.

Lors de la validation du formulaire, une requête HTTP `POST /api/user/signup` est effectuée.
Cette requête va créer l'utilisateur si le nom d'utilisateur n'existe pas déjà dans la base de données. Le mot de passe stocké est hashé grâce à [`bcryptjs`](https://www.npmjs.com/package/bcryptjs).

Si l'inscription se termine avec succès, vous serez redirigés vers la page de connexion (`/login`).

## Connexion (`/login`)

Pour vous connecter, entrez les mêmes valeurs que pendant l'inscription, c'est à dire, votre identifiant et mot de passe.

Lors de la validation du formulaire, une requête HTTP `POST /api/user/login` est effectuée.
Celle-ci va vérifier le nom d'utilisateur existe dans la base de données. Si oui, elle va vérifier si le mot de passe correspond au hash, toujours grâce à `bcryptjs`.

Si la vérification est correcte, on crée un token avec [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken). Ce token est fait à partir d'un payload, qui contiendra le nom de l'utilisateur ainsi que l'ID de l'utilisateur. Ce token sera stocké dans les cookies si tout se passe correctement.

Si la connexion se termine avec succès, vous serez redirigés vers [l'interface d'accueil](./interface-accueil.md) avec potentiellement [une notification de mail qui vous ménera au niveau d'introduction](./introduction.md).
