# gta-ynov-vue
https://clementcaillaud.github.io/gta-ynov-vue/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Copy dist/ folder to docs/ for deployment
```
npm run deploy
```

## Identification
Accès salarié :
```
login: Toto mdp: toto
```
Accès responsable d'équipe :
```
login: Tata mdp: tata
```
Accès DRH :
```
login: Titi mdp: titi
```

## Suivi du projet
Taches à réaliser : https://trello.com/b/g26tB7Dc/gta-ynov-vue
```
08/11/2018
```
Objectif: Page d'accueil, connexion + première ébauche des pages Fiche salarié, Tableau de Bord et Planning avec du contenu statique

Bilan: Page d'accueil et connexion fonctionnelles. Création d'une base de donnée locale (.json) accessible via un fichier api.js qui permet de simuler les appels à une api. Création de 3 utilisateurs (1 pour chaque rôle). Lors de la connexion, chargement des composants nécessaires au rôle de l'utilisateur (pour le moment seulement Planning, Tableau de bord et Fiche salarié). Début de la construction de la fiche salarié. Le design s'adapte aussi bien aux grands qu'aux petits écrans.
