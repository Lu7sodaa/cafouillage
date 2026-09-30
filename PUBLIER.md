# Publier cafouillage.fr sur GitHub Pages

Le site est statique : GitHub Pages le sert tel quel, gratuitement.
Adresse finale : **https://cafouillage.fr** — `www.cafouillage.fr` y redirigera.

---

## 1. Créer le dépôt

Sur github.com, bouton **New repository**.

- Repository name : `cafouillage`
- Visibilité : **Public** (Pages n'est gratuit sur dépôt privé qu'avec un compte Pro)
- Ne cochez ni README, ni .gitignore, ni licence

## 2. Envoyer le site

Ouvrez le Terminal et collez ces lignes une par une :

```bash
cd ~/Sites/cafouillage
git init
git add .
git status
```

`git status` liste ce qui va partir. Vérifiez que **n'apparaissent pas** :
`images/Product/`, `groplanmalak.jpg`, `P1040183.JPG`, `sabine.png`,
ni aucun `.DS_Store`. Le `.gitignore` les écarte déjà.

Si c'est bon :

```bash
git commit -m "Premiere version du site"
git branch -M main
git remote add origin https://github.com/Lu7sodaa/cafouillage.git
git push -u origin main
```

Git demandera votre identifiant GitHub et un mot de passe : ce n'est pas
votre mot de passe de compte mais un **jeton d'accès personnel**, à créer sur
github.com → Settings → Developer settings → Personal access tokens →
Tokens (classic) → Generate new token, avec la case `repo` cochée.
Copiez-le, il ne s'affiche qu'une fois.

## 3. Activer Pages

Sur le dépôt : **Settings → Pages**.

- Source : `Deploy from a branch`
- Branche : `main`, dossier : `/ (root)` → **Save**

Deux minutes plus tard le site répond sur `https://lu7sodaa.github.io/cafouillage/`.

Puis, sur la même page, champ **Custom domain** : tapez `cafouillage.fr`
et validez. GitHub crée tout seul un fichier `CNAME` à la racine du dépôt.
Il affichera une erreur DNS tant que l'étape 4 n'est pas faite : c'est normal.

## 4. La zone DNS chez OVH

Espace client → Noms de domaine → cafouillage.fr → **Zone DNS**.

Supprimez d'abord les enregistrements **A** et **AAAA** existants sur le
sous-domaine vide, ainsi que le **CNAME** sur `www` s'il pointe ailleurs.
Puis ajoutez :

| Type  | Sous-domaine | Cible                   |
|-------|--------------|-------------------------|
| A     | (vide)       | 185.199.108.153         |
| A     | (vide)       | 185.199.109.153         |
| A     | (vide)       | 185.199.110.153         |
| A     | (vide)       | 185.199.111.153         |
| CNAME | www          | `lu7sodaa.github.io.`   |

Le point final du CNAME fait partie de la valeur.

Facultatif, pour l'IPv6, quatre enregistrements **AAAA** sur le sous-domaine vide :
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Comptez de quelques minutes à 24 h de propagation. Pour vérifier depuis le
Terminal :

```bash
dig cafouillage.fr +short
```

Les quatre adresses `185.199.x.153` doivent apparaître.

## 5. Forcer le HTTPS

Une fois le DNS propagé, retournez dans Settings → Pages et cochez
**Enforce HTTPS**. La case reste grisée tant que le certificat n'est pas
émis — patientez et rechargez.

---

## Mettre le site à jour ensuite

Après chaque modification du dossier (une photo ajoutée, une ligne changée
dans `contenu.js`) :

```bash
cd ~/Sites/cafouillage
git add .
git commit -m "Ajout de deux photos"
git push
```

Le site en ligne se met à jour tout seul en une à deux minutes.

---

## À savoir

- Un dépôt public est **lisible par tout le monde**, historique compris.
  Ce qui a été poussé une fois y reste même après suppression : vérifiez
  le contenu avant le premier `push`.
- Les originaux photo restent sur votre Mac. Ils ne sont pas sauvegardés
  par GitHub : gardez-en une copie ailleurs.
- Le formulaire de contact ouvre la messagerie du visiteur ; il fonctionne
  sur GitHub Pages. Un envoi par le serveur demanderait un service tiers
  comme Formspree, GitHub Pages n'exécutant pas de PHP.
- Limites : 1 Go de dépôt, 100 Go de trafic par mois. Le dépôt fait
  environ 5 Mo.
- L'adresse `https://lu7sodaa.github.io/cafouillage/` continuera de
  fonctionner en parallèle du domaine.
