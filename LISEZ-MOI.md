# Cafouillage — notice du site

Site statique. Aucune base de données, aucun build, aucun abonnement.
Fonctionne sur n'importe quel hébergement mutualisé OVH, offre Perso comprise.

## Mise en ligne chez OVH

1. Espace client OVH, onglet Hébergements, votre offre, puis FTP-SSH.
   Notez le serveur FTP (`ftp.cluster0XX.hosting.ovh.net`), l'identifiant, le mot de passe.
2. Ouvrez FileZilla (gratuit) et connectez-vous avec ces identifiants.
3. Côté serveur, entrez dans le dossier `www`.
4. Glissez-y **le contenu** du dossier `cafouillage` — pas le dossier lui-même.
   Vous devez voir `index.html` directement à la racine de `www`.
5. Le site est en ligne sur votre nom de domaine.

Pour forcer le HTTPS, activez le certificat SSL gratuit dans l'espace client
(Hébergements, Multisite, modifier le domaine, cocher SSL).

## Structure

```
index.html          accueil : registre, image croisée pleine page, manifeste
realisations.html   registre complet avec filtres
projet.html         fiche d'un ouvrage, appelée par projet.html?ref=R-019
pieces.html         inventaire des pièces
sur-mesure.html     processus, délais, fourchettes de prix
ateliers.html       les trois ateliers
contact.html        brief professionnel
css/site.css        toute la mise en forme
js/site.js          rendu des listes
data/contenu.js     LE CONTENU — le seul fichier à modifier
images/             les photographies
```

## Changer le nom ou la base line

En haut de `data/contenu.js`, dans le bloc `ENSEIGNE`. Les deux se
propagent dans les sept pages et dans le lien de contact.

## L'image croisée de l'accueil

Deux gros plans, l'un en fond, l'autre découpé en diagonale par-dessus,
avec une couture claire à la jonction. Elle attend deux fichiers :

1. Déposez les deux photos dans `images/` — cadrage serré, matière plein
   cadre, en paysage, largeur 2400 px conseillée.
2. Dans `data/contenu.js`, bloc `CROISEMENT`, renseignez
   `gauche.fichier` et `droite.fichier`.

Tant que c'est vide, la zone affiche deux aplats sombres et la couture :
c'est propre, mais ce n'est pas l'effet voulu. La diagonale se retourne
automatiquement à l'horizontale sur téléphone.

## Le manifeste

Dans `data/contenu.js`, bloc `MANIFESTE`, un paragraphe par ligne entre
guillemets. Le premier est composé plus grand, le dernier en gris :
l'ordre compte.

## Ajouter un ouvrage

1. Déposez les photos dans `images/`, en JPG, largeur 2000 px maximum,
   nommées sans accent ni espace : `respiro-paris-01.jpg`.
2. Ouvrez `data/contenu.js`, copiez un bloc entre accolades, collez-le en
   haut de la liste `PROJETS`, changez les valeurs. Attention aux virgules.
3. Renvoyez `data/contenu.js` et le dossier `images/` par FTP.

Champ `images` : `[]` tant qu'il n'y a pas de photo — le site affiche
alors un cadre en attente, jamais une image cassée.
Sinon : `images: ["respiro-paris-01.jpg", "respiro-paris-02.jpg"]`.

Champ `statut` : `livre`, `atelier` (en cours) ou `dessin` (projet non
fabriqué, signalé par une pastille bleue dans le registre).

Champ `ateliers` : `cumulus`, `malak`, `khonsou`, ou plusieurs séparés par un
`+` pour un ouvrage à plusieurs mains, par exemple `cumulus+khonsou`.

## Ajouter ou modifier un atelier

Bloc `ATELIERS` dans `data/contenu.js`. L'ordre de la liste est celui des
pages Ateliers et du pied de page ; les filtres du registre sont, eux, dans
`realisations.html`.

## À faire avant la mise en ligne publique

- Remplacer `contact@cafouillage.fr` dans `data/contenu.js`
  (bloc `ENSEIGNE`) par l'adresse réelle.
- Faire valider les fourchettes de prix de `sur-mesure.html` : les chiffres
  actuels sont des hypothèses de travail, pas des tarifs.
- Vérifier les délais de la même page.
- Compléter la fiche khonsou : la ligne « Depuis » est vide, et la page
  Ateliers n'affiche pas de date de création pour cet atelier.
- Ajouter les mentions légales (obligatoire) : éditeur, hébergeur OVH,
  numéro SIRET.
- Déposer les photographies. Le site est conçu pour en manquer, mais il ne
  convaincra pas sans elles.

## Version anglaise

Non implémentée volontairement, pour ne pas livrer un bouton mort.
Le jour venu : dupliquer les pages dans un dossier `/en`, dupliquer
`contenu.js` en `contenu-en.js`, ajouter le lien dans les menus.

## Polices

Archivo et Spline Sans Mono, chargées depuis Google Fonts.
Pour ne dépendre de personne, téléchargez les deux familles, déposez-les
dans `css/fonts/` et remplacez le lien `fonts.googleapis.com` par des
règles `@font-face`.
