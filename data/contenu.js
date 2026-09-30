/* ---------------------------------------------------------------
   CAFOUILLAGE — contenu du site

   C'est le seul fichier à modifier pour ajouter un ouvrage,
   une pièce, ou changer un texte d'atelier.

   Pour ajouter un ouvrage : copier un bloc entre accolades,
   le coller en haut de la liste PROJETS, changer les valeurs.
   Garder les virgules entre les blocs.

   Champ "images" : noms des fichiers déposés dans /images.
   Laisser [] tant qu'il n'y a pas de photo : le site affiche
   un cadre en attente plutôt qu'une image cassée.

   Champ "statut"   : "livre", "atelier" ou "dessin".
   Champ "ateliers" : "cumulus", "malak", "hnhu", ou plusieurs
                      séparés par un +, par exemple "cumulus+hnhu".
   Champ "nature"   : "surface", "mobilier", "objet",
                      "structure" ou "papier".
--------------------------------------------------------------- */

var ENSEIGNE = {
  nom: "Cafouillage",
  baseLine: "Situation incertaine dans la surface de réparation",
  courriel: "contact@cafouillage.fr"
};

/* Image pleine page de l'accueil : deux gros plans qui se croisent.
   Déposer les fichiers dans /images, renseigner "fichier".
   Laisser vide pour afficher un cadre en attente. */
var CROISEMENT = {
  gauche:  { fichier: "croisement-terre.jpg", legende: "Carreaux de faïence, Sabine Orlandini" },
  droite:  { fichier: "croisement-metal.jpg", legende: "Aluminium de fonderie, Atelier Malak" }
};

var MANIFESTE = {
  titre: "Manifeste",
  paragraphes: [
    "Plusieurs corps, un ballon, et plus personne pour dire à qui appartient le geste. Le but est marqué avant qu'on ait décidé qui l'a mis.",
    "Trois ateliers à Lyon : la terre, le métal, le papier.",
    "Nous ne vendons pas des produits mais des hypothèses d'usage. La fonction n'est ni immédiate ni définitive, et c'est mieux ainsi.",
  ]
};

var ATELIERS = [
  {
    cle: "cumulus",
    nom: "Sabine Orlandini",
    personne: "Sabine Orlandini",
    matiere: "La terre",
    lieu: "Lyon Croix-Rousse",
    depuis: "2008",
    texte: [
      "Architecte de formation et scénographe, Sabine Orlandini crée son atelier céramique en 2008 et se consacre depuis au travail de la terre. Elle conçoit et fabrique ses propres carreaux de faïence émaillée pour des murals, des crédences, des îlots et des banques d'accueil dessinés à partir de l'histoire du lieu.",
      "Ses objets — centres de table, coupes, vases, caisses — tiennent à la fois de la sculpture et de l'usage. Elle dit d'eux que leur fonction n'est ni immédiate ni définitive, et qu'elle aime les voir servir à ce qu'elle n'avait pas prévu."
    ],
    fiche: [
      ["Depuis", "2008"],
      ["Matières", "Terre de faïence, émaux d'atelier"],
      ["Prescripteurs", "L'ensemblier, Lyon"],
      ["Points de vente", "L'ensemblier Lyon, le 13 Genève, Maison Panache"],
      ["Presse", "Milk Decoration, My Little Lyon"]
    ],
    images: ["sabine-web.jpg"]
  },
  {
    cle: "malak",
    creditPhotos: "Collection Mangrove, photographies Benoît Carduner",
    nom: "Atelier Malak",
    personne: "Malacou Lefebvre",
    matiere: "Le métal",
    lieu: "Vaulx-en-Velin",
    depuis: "2018",
    texte: [
      "Malacou Lefebvre fonde l'Atelier Malak en 2018 après une carrière dans la finance. Autodidacte, il développe en huit ans une maîtrise personnelle du métal — soudure, cintrage, fonderie d'aluminium — dans une ancienne usine en déconstruction dont il récupère les matériaux.",
      "Son travail passe du design minimaliste à un territoire plus ambigu, entre sculpture et mobilier. Mangrove, sa première collection de sculptures fonctionnelles, tient sur une idée : aucune forme n'est autonome, chacune n'existe que par les liens qu'elle établit."
    ],
    fiche: [
      ["Depuis", "2018"],
      ["Matières", "Acier inoxydable, aluminium de fonderie recyclé"],
      ["Salons", "Fuorisalone Milan, Edit Napoli, Paris Design Week, Isola"],
      ["Distinction", "Gen D, Dolce & Gabbana Casa, 2023"],
      ["Presse", "Wallpaper, Sight Unseen, Elle, AD India, Côté Sud"]
    ],
    images: ["malak-web.jpg"]
  },
  {
    cle: "hnhu",
    nom: "hnhu",
    personne: "Lucas Piessat",
    matiere: "Le papier",
    lieu: "Chevinay",
    depuis: "",
    texte: [
      "Garder les livres et utiliser le papier ?",
      "On ne regarde jamais la lumière. On regarde ce qu'elle touche, ce qui la renvoie, ce qui l'arrête. L'espace qu'elle fait naitre. Elle ne devient visible qu'au prix d'un détour. hnhu fabrique ces détours : filtrer, tamiser, pour qu'il reste quelque chose à voir, et parce que l'ombre n'est pas un oubli.",
    ],
    fiche: [
      ["Matières", "Papier"],
      ["Interventions", "Éclairage d'ouvrage"],
    ],
    images: ["lucas.jpg"]
  }
];

var PROJETS = [
  {
    ref: "R-022",
    date: "2024-04",
    dateAffichee: "Avril 2024",
    titre: "Fuorisalone",
    programme: "Installation",
    lieu: "Milan",
    commanditaire: "Circuit off du Salone del Mobile",
    ateliers: "malak",
    nature: "structure",
    statut: "livre",
    matieres: ["Acier inoxydable", "Aluminium de fonderie"],
    dimensions: "",
    delai: "",
    texte: "Présentation des pièces de l'atelier dans le circuit off du Salone. Structures cintrées et plateaux de fonderie, en série courte.",
    images: []
  },
  {
    ref: "R-021",
    date: "2023-04",
    dateAffichee: "Avril 2023",
    titre: "Palaver Garden",
    programme: "Installation",
    lieu: "Dolce & Gabbana Casa, Milan",
    commanditaire: "Gen D, curation Federica Sala",
    ateliers: "malak",
    nature: "structure",
    statut: "livre",
    matieres: ["Acier inoxydable"],
    dimensions: "",
    delai: "",
    texte: "Sélection parmi dix designers pour la Milan Design Week. Une installation pensée comme un lieu de parole : des assises qui se tiennent les unes aux autres.",
    images: []
  },
  {
    ref: "R-020",
    date: "2022-12",
    dateAffichee: "Décembre 2022",
    titre: "Crédence de cuisine",
    programme: "Crédence de cuisine",
    lieu: "Appartement, Croix-Rousse, Lyon",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée", "Carreau façonné main"],
    dimensions: "",
    delai: "",
    texte: "Carreaux fabriqués et émaillés à l'atelier, calepinage dessiné pour ce mur et pour aucun autre.",
    images: ["projets/croix-rousse-2022.jpg"]
  },
  {
    ref: "R-019",
    date: "2022-09",
    dateAffichee: "Septembre 2022",
    titre: "Banque d'accueil",
    programme: "Agencement de boutique",
    lieu: "Respiro, Paris",
    commanditaire: "Respiro",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée", "Carreau façonné main"],
    dimensions: "",
    delai: "",
    texte: "Second comptoir livré pour l'enseigne, six ans après celui de Lyon. Toute la façade et le retour en carreaux façonnés à la main.",
    images: []
  },
  {
    ref: "R-018",
    date: "2022-06",
    dateAffichee: "Juin 2022",
    titre: "Mural céramique",
    programme: "Habillage mural",
    lieu: "Appartement, Guillotière, Lyon",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "",
    images: []
  },
  {
    ref: "R-017",
    date: "2021-12",
    dateAffichee: "Décembre 2021",
    titre: "Crédence de lave-mains",
    programme: "Habillage mural",
    lieu: "Lyon",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "Petite surface, deux calices posés. La pièce montre qu'un mural ne commence pas à dix mètres carrés.",
    images: []
  },
  {
    ref: "R-016",
    date: "2021-06",
    dateAffichee: "Juin 2021",
    titre: "Mural de kitchenette",
    programme: "Habillage mural",
    lieu: "Maison, Tassin-la-Demi-Lune",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "",
    images: []
  },
  {
    ref: "R-015",
    date: "2021-05",
    dateAffichee: "Mai 2021",
    titre: "Crédence de cuisine",
    programme: "Crédence de cuisine",
    lieu: "Maison, Savoie",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "Crédence de cuisine face à la montagne, en camaïeu sombre. Les carreaux couvrent toute la hauteur entre le plan et les meubles hauts.",
    images: ["projets/savoie.jpg"]
  },
  {
    ref: "R-014",
    date: "2021-05",
    dateAffichee: "Mai 2021",
    titre: "Mural céramique",
    programme: "Habillage mural",
    lieu: "Maison, Saint-Cyr-au-Mont-d'Or",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "",
    images: []
  },
  {
    ref: "R-013",
    date: "2021-03",
    dateAffichee: "Mars 2021",
    titre: "Crédence de cuisine",
    programme: "Crédence de cuisine",
    lieu: "Appartement, Croix-Rousse, Lyon",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "Crédence de cuisine dont le calepinage déborde du plan de travail et se prolonge sur le mur, en lignes brisées.",
    images: ["projets/croix-rousse-2021-1.jpg", "projets/croix-rousse-2021-2.jpg", "projets/croix-rousse-2021-3.jpg"]
  },
  {
    ref: "R-012",
    date: "2020-11",
    dateAffichee: "Novembre 2020",
    titre: "Îlot central",
    programme: "Agencement de cuisine",
    lieu: "Appartement, Croix-Rousse, Lyon",
    commanditaire: "L'ensemblier, architectes d'intérieur",
    ateliers: "cumulus",
    nature: "mobilier",
    statut: "livre",
    matieres: ["Faïence émaillée", "Carreau façonné main"],
    dimensions: "",
    delai: "",
    texte: "Îlot entièrement revêtu de carreaux façonnés un par un. Projet mené avec l'agence, du calepinage à la pose.",
    images: ["projets/croix-rousse-ilot-2.jpg", "projets/croix-rousse-ilot-1.jpg"]
  },
  {
    ref: "R-011",
    date: "2020-10",
    dateAffichee: "Octobre 2020",
    titre: "Crédence de cuisine",
    programme: "Crédence de cuisine",
    lieu: "Maison, Saint-Pierre-la-Palud",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "Crédence de cuisine en retour d'angle, carreaux façonnés et émaillés à l'atelier. Le calepinage descend jusqu'au sol dans l'angle.",
    images: ["projets/st-pierre-la-palud-1.jpg", "projets/st-pierre-la-palud-2.jpg"]
  },
  {
    ref: "R-010",
    date: "2020-05",
    dateAffichee: "Mai 2020",
    titre: "Mural céramique",
    programme: "Habillage mural",
    lieu: "Appartement, Croix-Rousse, Lyon",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée"],
    dimensions: "",
    delai: "",
    texte: "",
    images: []
  },
  {
    ref: "R-009",
    date: "2016-10",
    dateAffichee: "Octobre 2016",
    titre: "Banque d'accueil",
    programme: "Agencement de boutique",
    lieu: "Respiro, Lyon",
    commanditaire: "Respiro",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée", "Carreau façonné main"],
    dimensions: "",
    delai: "",
    texte: "Premier comptoir livré pour l'enseigne. Une surface qui reçoit du public tous les jours depuis dix ans.",
    images: ["projets/respiro-lyon.jpg"]
  },
  {
    ref: "R-008",
    date: "2014-06",
    dateAffichee: "Juin 2014",
    titre: "Crédence de cuisine",
    programme: "Crédence de cuisine",
    lieu: "Appartement, Saint-Rambert, Lyon",
    commanditaire: "Commande privée",
    ateliers: "cumulus",
    nature: "surface",
    statut: "livre",
    matieres: ["Faïence émaillée", "Carreau façonné main"],
    dimensions: "",
    delai: "",
    texte: "Crédence dont la ligne haute suit une pente irrégulière. Carreaux de tailles inégales, en camaïeu de bleus, de jaunes et de roses.",
    images: ["projets/st-rambert-1.jpg", "projets/st-rambert-2.jpg"]
  }
];

var PIECES = [
  /* Collaborations : plusieurs ateliers séparés par un +.
     Elles s'affichent dans un groupe à part, en tête de page. */
  { ref: "RH01", titre: "Rhizome",                      annee: "",     atelier: "malak+hnhu", matiere: "Acier, papier",                                  tirage: "",              images: ["pieces/rhizome-02.jpg", "pieces/rhizome-07.jpg", "pieces/rhizome-01.jpg", "pieces/rhizome-03.jpg", "pieces/rhizome-04.jpg", "pieces/rhizome-05.jpg", "pieces/rhizome-06.jpg", "pieces/rhizome-08.jpg"] },

  /* Atelier Malak — collection Mangrove. Première image : vue principale ;
     seconde image (facultative) : affichée au survol. */
  { ref: "T01",  titre: "Mangrove T01",                 annee: "2026", atelier: "malak",   matiere: "Acier inoxydable, aluminium de fonderie recyclé", tirage: "Pièce unique",  images: ["pieces/T01.jpg", "pieces/T01-b.jpg"] },
  { ref: "T02",  titre: "Mangrove T02",                 annee: "2026", atelier: "malak",   matiere: "Acier inoxydable, aluminium de fonderie recyclé", tirage: "Pièce unique",  images: ["pieces/T02.jpg", "pieces/T02-b.jpg"] },
  { ref: "T03",  titre: "Mangrove T03",                 annee: "2026", atelier: "malak",   matiere: "Acier inoxydable, aluminium de fonderie recyclé", tirage: "Micro-série",   images: ["pieces/T03.jpg"] },
  { ref: "B01",  titre: "Mangrove B01",                 annee: "2026", atelier: "malak",   matiere: "Acier inoxydable, aluminium de fonderie recyclé", tirage: "Pièce unique",  images: ["pieces/B01.jpg"] },
  { ref: "S01",  titre: "Mangrove S01",                 annee: "2026", atelier: "malak",   matiere: "Acier inoxydable",                                tirage: "Pièce unique",  images: ["pieces/S01.jpg", "pieces/S01-b.jpg"] },
  { ref: "C01",  titre: "Mangrove C01",                 annee: "2026", atelier: "malak",   matiere: "Acier inoxydable",                                tirage: "Pièce unique",  images: ["pieces/C01.jpg"] },
  { ref: "C-14", titre: "Le jeu des formes",             annee: "",     atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: ["pieces/jeu-des-formes.jpg"] },
  { ref: "C-13", titre: "Tableau",                      annee: "",     atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: ["pieces/tableau.jpg"] },
  { ref: "C-12", titre: "Table",                        annee: "",     atelier: "cumulus", matiere: "Bois et faïence émaillée",                        tirage: "Pièce unique",  images: ["pieces/table.jpg", "pieces/table-b.jpg"] },
  { ref: "C-11", titre: "Vase forteresse",              annee: "2020", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: [] },
  { ref: "C-10", titre: "Centre de table paravents",    annee: "2021", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: [] },
  { ref: "C-09", titre: "Dialogue architectural",       annee: "2021", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: [] },
  { ref: "C-08", titre: "Coupes aux anses",             annee: "2020", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Sur commande",  images: [] },
  { ref: "C-07", titre: "Centre de table tout en ovale",annee: "2019", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: [] },
  { ref: "C-06", titre: "Composition géométrique",      annee: "2022", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: [] },
  { ref: "C-05", titre: "Gobelet surélevé",             annee: "2018", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Sur commande",  images: [] },
  { ref: "C-04", titre: "Espèce d'espace",              annee: "2019", atelier: "cumulus", matiere: "Faïence émaillée",                                tirage: "Pièce unique",  images: [] }
];
