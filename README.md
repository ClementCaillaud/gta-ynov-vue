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

```
09/11/2018
```
Objectif: Terminer la structure des pages commencées hier. Lire et modifier les données de la fiche salarié. Commencer l'affichage du planning.

Bilan: Résolution de divers bug (accès au json, bug avec un formulaire, ...). Expérimentation de plusieurs solutions déjà existantes pour la mise en place du planning avant de finalement décider de concevoir mon propore système de planning. Tâche commencée le matin mais pas eu le temps de continuer l'après-midi.

```
15/11/2018
```
Objectif: Consultation et modification de la fiche salarié. Consulatiton du planning.

Bilan: Lecture et modifications des données du salarié. Pas d'enregistrement vers la BDD (json) pour le moment, les données modifiées sont enregistrées en local. Lecture et affichage du planning sous forme de card, avec un code couleur différent en fonction du type d'occupation. Adaptation de l'affichage en fonction du type d'écran. Travail seulement l'après-midi.

```
16/11/2018
```
Objectif: Terminer l'affichage du planning et des occupations. Ajouter les compteurs d'heures. Commencer la page Tableau de Bord.

Bilan: Affichage du planning avec un code couleur en fonction du type d'occupation. Compteurs d'heures quotidien et hebdomadaire, pas encore de design. Travail seulement le matin.

```
22/11/2018
```
Objectif: Terminer les compteurs horaires. Pour le responsable d'équipe, consulter et modifier le planning des membres de son équipe.

Bilan: Les compteurs d'heures fonctionnent et changent de couleur si le nombre d'heure est trop élevé. Ajout de la possibilité d'utiliser les filtres de date sur le planning et les compteurs. Mise en place de l'utilisation de props à la place des structures du type this.$parent.$parent.$parent... Corrections de petits bugs/anomalies. Les responsables d'équipe peuvent désormais consulter la liste des membres de leur équipe, ainsi que la fiche salarié et le planning de chacun d'eux. Modification du planning du salarié par le manager commencé mais pas encore de solution viable. Ajout de quelques icones pour rendre tout ça un peu plus joli.

```
23/11/2018
```
Objectif: Mise en place de PouchDB. Permettre au chef d'équipe de modifier le planning de son équipe et d'ajouter des salariés. Autoriser les employés à demander des changements dans leur planning.
