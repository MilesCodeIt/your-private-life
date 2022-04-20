# Les niveaux

Chaque niveau contient un ID (trouvable dans `@/pages/levels`).
Cet ID nous sert de repère pour savoir s'il a été terminé ou non dans la base de données.

La progression d'un niveau est sauvegardé en valeur booléenes.
Lorsqu'un niveau est terminé, on change donc son état de `false` à `true`.

## Interface des niveaux stockés

```typescript
interface Levels {
  [id: string]: boolean;
}
```

## Modification de l'état d'un niveau

Pour modifier l'état de progression d'un niveau, on utilise la requête HTTP `POST /api/user/levels` avec un corps constitué comme celà `{ finished: boolean, level_id: string }`.

Si le changement a été effectué avec succès, la requête renvoie un statut `200` ainsi que `{ "success": true }` en corps de réponse.

Sinon, la réponse sera constitué de cette façon `{ success: false, message: string }`.
