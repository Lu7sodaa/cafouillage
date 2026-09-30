/* Cafouillage — rendu des contenus. Aucune dépendance. */

(function () {
  "use strict";

  var NOM_NATURE = {
    surface: "Surface",
    mobilier: "Mobilier",
    objet: "Objet",
    structure: "Structure",
    lumiere: "Lumière"
  };

  function echappe(chaine) {
    var d = document.createElement("div");
    d.textContent = chaine == null ? "" : String(chaine);
    return d.innerHTML;
  }

  function texte(valeur) {
    return valeur && String(valeur).trim() ? echappe(valeur) : "—";
  }

  function nomAtelier(cles) {
    if (typeof ATELIERS === "undefined" || !cles) return "";
    return String(cles).split("+").map(function (c) {
      var a = ATELIERS.filter(function (x) { return x.cle === c.trim(); })[0];
      return a ? a.nom : c.trim();
    }).join(" et ");
  }

  /* Accepte "photo.jpg" comme "images/photo.jpg" : le préfixe est
     retiré s'il est déjà écrit dans le fichier de contenu. */
  function chemin(fichier) {
    var f = String(fichier).trim().replace(/^\.?\/*/, "").replace(/^images\//i, "");
    return "images/" + f;
  }

  function cadre(images, format, legende) {
    var classe = "cadre cadre--" + (format || "large");
    if (images && images.length) {
      return '<div class="' + classe + '"><img src="' + echappe(chemin(images[0])) +
        '" alt="' + echappe(legende || "") + '" loading="lazy"></div>';
    }
    return '<div class="' + classe + '"><span class="cadre-vide donnee">Photographie à venir</span></div>';
  }

  /* ---------- enseigne ---------- */

  function rendEnseigne() {
    if (typeof ENSEIGNE === "undefined") return;

    document.querySelectorAll("[data-nom]").forEach(function (n) {
      n.textContent = ENSEIGNE.nom;
    });
    document.querySelectorAll("[data-baseline]").forEach(function (n) {
      n.textContent = ENSEIGNE.baseLine;
    });
    document.querySelectorAll("[data-courriel]").forEach(function (n) {
      n.textContent = ENSEIGNE.courriel;
      n.setAttribute("href", "mailto:" + ENSEIGNE.courriel);
    });
  }

  /* ---------- croisement pleine page ---------- */

  function rendCroisement() {
    var hote = document.querySelector("[data-croisement]");
    if (!hote || typeof CROISEMENT === "undefined") return;

    function pan(cote, donnees) {
      var img = donnees && donnees.fichier
        ? '<img src="' + echappe(chemin(donnees.fichier)) + '" alt="' + echappe(donnees.legende || "") + '">'
        : "";
      return '<div class="croisement-pan croisement-pan--' + cote + '">' + img + '</div>';
    }

    hote.innerHTML =
      pan("gauche", CROISEMENT.gauche) +
      pan("droite", CROISEMENT.droite) +
      '<div class="croisement-voile"></div>' +
      '<div class="croisement-couture croisement-couture--ombre"></div>' +
      '<div class="croisement-couture"></div>' +
      '<span class="croisement-legende croisement-legende--gauche donnee">' +
        echappe((CROISEMENT.gauche && CROISEMENT.gauche.legende) || "") + '</span>' +
      '<span class="croisement-legende croisement-legende--droite donnee">' +
        echappe((CROISEMENT.droite && CROISEMENT.droite.legende) || "") + '</span>';
  }

  /* ---------- manifeste ---------- */

  function rendManifeste() {
    var hote = document.querySelector("[data-manifeste]");
    if (!hote || typeof MANIFESTE === "undefined") return;

    hote.innerHTML = MANIFESTE.paragraphes.map(function (p) {
      return "<p>" + echappe(p) + "</p>";
    }).join("");
  }

  /* ---------- registre ---------- */

  function ligneRegistre(p) {
    var marqueur = p.statut === "dessin"
      ? '<span class="marqueur donnee">dessin</span>'
      : (p.statut === "atelier" ? '<span class="marqueur donnee">en cours</span>' : "");

    return '<tr>' +
      '<td class="donnee tres-discret">' + echappe(p.ref) + '</td>' +
      '<td class="donnee discret">' + echappe(p.dateAffichee || p.date) + '</td>' +
      '<td><a href="projet.html?ref=' + encodeURIComponent(p.ref) + '">' + echappe(p.titre) + '</a>' + marqueur + '</td>' +
      '<td class="col-lieu discret">' + echappe(p.lieu) + '</td>' +
      '<td class="col-atelier donnee discret">' + echappe(nomAtelier(p.ateliers)) + '</td>' +
      '</tr>';
  }

  function rendRegistre() {
    var corps = document.querySelector("[data-registre]");
    if (!corps || typeof PROJETS === "undefined") return;

    var limite = parseInt(corps.getAttribute("data-registre"), 10);

    function peindre(items) {
      corps.innerHTML = items.length
        ? items.map(ligneRegistre).join("")
        : '<tr><td colspan="5" class="discret" style="padding:1.5rem 0;">Aucun ouvrage dans cette catégorie pour le moment.</td></tr>';
    }

    peindre(isNaN(limite) ? PROJETS : PROJETS.slice(0, limite));

    var barre = document.querySelector("[data-filtres]");
    if (!barre) return;

    barre.addEventListener("click", function (e) {
      var bouton = e.target.closest("button[data-filtre]");
      if (!bouton) return;

      barre.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === bouton));
      });

      var f = bouton.getAttribute("data-filtre");
      peindre(f === "tout" ? PROJETS : PROJETS.filter(function (p) {
        return String(p.ateliers).split("+").indexOf(f) !== -1 || p.nature === f;
      }));
    });
  }

  /* ---------- fiche d'un ouvrage ---------- */

  function rendProjet() {
    var hote = document.querySelector("[data-projet]");
    if (!hote || typeof PROJETS === "undefined") return;

    var ref = new URLSearchParams(window.location.search).get("ref");
    var p = PROJETS.filter(function (x) { return x.ref === ref; })[0];

    if (!p) {
      hote.innerHTML = '<div class="section bande"><h1>Cet ouvrage n\'est pas au registre</h1>' +
        '<p class="chapo" style="margin-top:1.25rem;">La référence demandée n\'existe pas ou a été renommée.</p>' +
        '<p style="margin-top:1.5rem;"><a class="lien-souligne" href="realisations.html">Revenir au registre</a></p></div>';
      document.title = "Ouvrage introuvable — Cafouillage";
      return;
    }

    document.title = p.titre + ", " + p.lieu + " — Cafouillage";

    var galerie = (p.images && p.images.length ? p.images : [null]).map(function (img) {
      return cadre(img ? [img] : [], img ? "photo" : "large", p.titre + ", " + p.lieu);
    }).join("");

    hote.innerHTML =
      '<div class="section bande">' +
        '<p class="donnee tres-discret">' + echappe(p.ref) + " — " + echappe(p.dateAffichee) + '</p>' +
        '<h1 style="margin-top:0.9rem;">' + echappe(p.titre) + '</h1>' +
        '<p class="chapo" style="margin-top:1rem;">' + echappe(p.lieu) + '</p>' +
        (p.texte ? '<p class="mesure" style="margin-top:1.75rem;">' + echappe(p.texte) + '</p>' : '') +
      '</div>' +
      '<div class="bande" style="display:grid;gap:1.25rem;padding-bottom:3.5rem;">' + galerie + '</div>' +
      '<div class="section section--filet bande">' +
        '<h2>Fiche d\'ouvrage</h2>' +
        '<table class="fiche mesure-large" style="margin-top:1.5rem;">' +
          '<tr><th>Référence</th><td class="donnee">' + echappe(p.ref) + '</td></tr>' +
          '<tr><th>Date</th><td>' + echappe(p.dateAffichee) + '</td></tr>' +
          '<tr><th>Programme</th><td>' + texte(p.programme) + '</td></tr>' +
          '<tr><th>Lieu</th><td>' + echappe(p.lieu) + '</td></tr>' +
          '<tr><th>Commanditaire</th><td>' + texte(p.commanditaire) + '</td></tr>' +
          '<tr><th>Atelier</th><td>' + echappe(nomAtelier(p.ateliers)) + '</td></tr>' +
          '<tr><th>Nature</th><td>' + echappe(NOM_NATURE[p.nature] || "") + '</td></tr>' +
          '<tr><th>Matières</th><td>' + echappe((p.matieres || []).join(", ")) + '</td></tr>' +
          '<tr><th>Dimensions</th><td>' + texte(p.dimensions) + '</td></tr>' +
          '<tr><th>Délai de fabrication</th><td>' + texte(p.delai) + '</td></tr>' +
        '</table>' +
        '<p style="margin-top:2rem;"><a class="lien-souligne" href="realisations.html">Revenir au registre</a></p>' +
      '</div>';
  }

  /* ---------- pièces ---------- */

  function rendPieces() {
    var hote = document.querySelector("[data-pieces]");
    if (!hote || typeof PIECES === "undefined") return;

    var ateliers = typeof ATELIERS !== "undefined" ? ATELIERS : [];

    function cles(p) {
      return String(p.atelier || "").split("+").map(function (c) { return c.trim(); });
    }

    function nomCourt(cle) {
      var a = ateliers.filter(function (x) { return x.cle === cle; })[0];
      return a ? a.nom : cle;
    }

    /* Vignette : photo (ou cadre en attente), titre, atelier, matière.
       Une seconde image, si elle existe, remplace la première au survol
       ou au focus clavier. */
    function vignette(p) {
      var vues = p.images || [];
      var deuxVues = vues.length > 1;
      var photo = vues.length
        ? '<div class="cadre cadre--portrait piece-photo">' +
            '<img src="' + echappe(chemin(vues[0])) + '" alt="' + echappe(p.titre) + '" loading="lazy">' +
            (deuxVues
              ? '<img class="piece-autre-vue" src="' + echappe(chemin(vues[1])) + '" alt="' +
                echappe(p.titre + ", autre vue") + '" loading="lazy">'
              : "") +
          '</div>'
        : cadre([], "portrait", p.titre);

      var signature = cles(p).map(nomCourt).join(" × ");

      var lien = 'piece.html?ref=' + encodeURIComponent(p.ref);

      return '<article class="vignette piece' + (deuxVues ? " piece--deux-vues" : "") + '">' +
        '<a href="' + lien + '">' + photo + '</a>' +
        '<h3><a href="' + lien + '">' + echappe(p.titre) + '</a></h3>' +
        '<span class="donnee">' + echappe(signature) + '</span>' +
        '<span class="donnee">' + [p.annee, p.matiere].filter(Boolean).map(echappe).join(" — ") + '</span>' +
        (p.tirage ? '<span class="donnee">' + echappe(p.tirage) + '</span>' : "") +
        '</article>';
    }

    /* Ordre : les ateliers sont mélangés, en alternance — une pièce de
       chacun à tour de rôle (les collaborations comptent comme un atelier).
       L'ordre reste le même d'une visite à l'autre. */
    var paquets = {}, ordrePaquets = [];
    PIECES.forEach(function (p) {
      var k = String(p.atelier || "");
      if (!paquets[k]) { paquets[k] = []; ordrePaquets.push(k); }
      paquets[k].push(p);
    });
    var toutes = [], reste = true;
    for (var tour = 0; reste; tour++) {
      reste = false;
      ordrePaquets.forEach(function (k) {
        if (paquets[k][tour]) { toutes.push(paquets[k][tour]); reste = true; }
      });
    }

    function peindre(filtre) {
      var liste = toutes.filter(function (p) {
        if (filtre === "tout") return true;
        if (filtre === "collaborations") return cles(p).length > 1;
        return cles(p).indexOf(filtre) !== -1;
      });
      hote.innerHTML = liste.length
        ? '<div class="grille grille-pieces">' + liste.map(vignette).join("") + '</div>'
        : '<p class="discret">Aucune pièce dans cette catégorie pour le moment.</p>';
    }

    peindre("tout");

    /* Barre de filtres, construite à partir des ateliers qui ont des pièces */
    var barre = document.querySelector("[data-filtres-pieces]");
    if (!barre) return;

    var boutons = [["tout", "Tout"]];
    ateliers.forEach(function (a) {
      var aDesPieces = PIECES.some(function (p) { return cles(p).indexOf(a.cle) !== -1; });
      if (aDesPieces) boutons.push([a.cle, nomCourt(a.cle)]);
    });
    if (PIECES.some(function (p) { return cles(p).length > 1; })) {
      boutons.push(["collaborations", "Collaborations"]);
    }

    barre.innerHTML = boutons.map(function (b, i) {
      return '<button type="button" data-filtre="' + echappe(b[0]) + '" aria-pressed="' + (i === 0) + '">' +
        echappe(b[1]) + '</button>';
    }).join("");

    barre.addEventListener("click", function (e) {
      var bouton = e.target.closest("button[data-filtre]");
      if (!bouton) return;
      barre.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === bouton));
      });
      peindre(bouton.getAttribute("data-filtre"));
    });

    /* Crédits photographiques, sous la grille */
    var credits = document.querySelector("[data-credits-pieces]");
    if (credits) {
      credits.textContent = ateliers.filter(function (a) { return a.creditPhotos; })
        .map(function (a) { return a.creditPhotos; })
        .join(". ");
    }
  }

  /* ---------- fiche d'une pièce ---------- */

  function rendPieceSeule() {
    var hote = document.querySelector("[data-piece]");
    if (!hote || typeof PIECES === "undefined") return;

    var ref = new URLSearchParams(window.location.search).get("ref");
    var p = PIECES.filter(function (x) { return x.ref === ref; })[0];

    if (!p) {
      hote.innerHTML = '<div class="section bande"><h1>Cette pièce n\'est pas au catalogue</h1>' +
        '<p class="chapo" style="margin-top:1.25rem;">La référence demandée n\'existe pas ou a été renommée.</p>' +
        '<p style="margin-top:1.5rem;"><a class="lien-souligne" href="pieces.html">Revenir aux pièces</a></p></div>';
      document.title = "Pièce introuvable — Cafouillage";
      return;
    }

    var ateliers = typeof ATELIERS !== "undefined" ? ATELIERS : [];
    var signature = String(p.atelier || "").split("+").map(function (c) {
      var a = ateliers.filter(function (x) { return x.cle === c.trim(); })[0];
      return a ? a.nom : c.trim();
    }).join(" × ");

    document.title = p.titre + " — Cafouillage";

    var galerie = (p.images && p.images.length ? p.images : [null]).map(function (img) {
      return cadre(img ? [img] : [], img ? "photo" : "large", p.titre);
    }).join("");


    hote.innerHTML =
      '<div class="section bande">' +
        '<p class="donnee tres-discret">' + echappe(p.ref) + '</p>' +
        '<h1 style="margin-top:0.9rem;">' + echappe(p.titre) + '</h1>' +
        '<p class="chapo" style="margin-top:1rem;">' + echappe(signature) + '</p>' +
      '</div>' +
      '<div class="bande" style="display:grid;gap:1.25rem;padding-bottom:3.5rem;">' + galerie + '</div>' +
      '<div class="section section--filet bande">' +
        '<h2>Fiche de la pièce</h2>' +
        '<table class="fiche mesure-large" style="margin-top:1.5rem;">' +
          '<tr><th>Référence</th><td class="donnee">' + echappe(p.ref) + '</td></tr>' +
          '<tr><th>Atelier</th><td>' + echappe(signature) + '</td></tr>' +
          '<tr><th>Année</th><td>' + texte(p.annee) + '</td></tr>' +
          '<tr><th>Matières</th><td>' + texte(p.matiere) + '</td></tr>' +
          '<tr><th>Tirage</th><td>' + texte(p.tirage) + '</td></tr>' +
        '</table>' +
        '<p style="margin-top:2rem;"><a class="lien-souligne" href="pieces.html">Revenir aux pièces</a></p>' +
      '</div>';
  }

  /* ---------- ateliers ---------- */

  function rendAteliers() {
    var hote = document.querySelector("[data-ateliers]");
    if (!hote || typeof ATELIERS === "undefined") return;

    hote.innerHTML = ATELIERS.map(function (a, i) {
      var fiche = (a.fiche || []).map(function (l) {
        return "<tr><th>" + echappe(l[0]) + "</th><td>" + echappe(l[1]) + "</td></tr>";
      }).join("");

      return '<section class="section' + (i ? " section--filet" : "") + ' bande" id="' + echappe(a.cle) + '">' +
        '<div class="atelier">' +
          '<div>' + cadre(a.images, "atelier", a.nom) + '</div>' +
          '<div>' +
            '<h2>' + echappe(a.nom) + '</h2>' +
            '<p class="atelier-matiere donnee">' +
              [a.matiere, a.personne !== a.nom ? a.personne : "", a.lieu].filter(Boolean).map(echappe).join(" — ") + '</p>' +
            a.texte.map(function (t) { return "<p>" + echappe(t) + "</p>"; }).join("") +
            '<table class="fiche" style="margin-top:1.5rem;">' + fiche + '</table>' +
          '</div>' +
        '</div>' +
      '</section>';
    }).join("");
  }

  /* ---------- formulaire ---------- */

  function brancheFormulaire() {
    var form = document.querySelector("[data-brief]");
    if (!form) return;

    var erreur = form.querySelector("[data-erreur]");

    form.addEventListener("input", function () {
      if (erreur) erreur.textContent = "";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var d = new FormData(form);
      var nom = (d.get("nom") || "").trim();
      var projet = (d.get("projet") || "").trim();

      if (!nom || !projet) {
        if (erreur) erreur.textContent = "Indiquez au moins votre nom et une description du projet.";
        return;
      }

      var corps = [
        "Nom : " + nom,
        "Structure : " + (d.get("structure") || "—"),
        "Ville : " + (d.get("ville") || "—"),
        "Nature de l'ouvrage : " + (d.get("nature") || "—"),
        "Surface ou dimensions : " + (d.get("surface") || "—"),
        "Échéance souhaitée : " + (d.get("echeance") || "—"),
        "Budget indicatif : " + (d.get("budget") || "—"),
        "",
        "Projet :",
        projet
      ].join("\n");

      var adresse = (typeof ENSEIGNE !== "undefined" && ENSEIGNE.courriel) || "contact@cafouillage.fr";

      window.location.href = "mailto:" + adresse +
        "?subject=" + encodeURIComponent("Demande de projet — " + nom) +
        "&body=" + encodeURIComponent(corps);
    });
  }

  /* ---------- navigation courante ---------- */

  function marqueNav() {
    var page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach(function (a) {
      if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
    });
  }

  /* Chaque bloc est isolé : si l'un échoue — une virgule oubliée dans
     le fichier de contenu, par exemple — les autres s'affichent quand
     même, et la cause est lisible dans la console du navigateur. */
  function sûr(nom, fonction) {
    try {
      fonction();
    } catch (e) {
      if (window.console && console.error) {
        console.error("Cafouillage — " + nom + " n'a pas pu s'afficher :", e.message);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    sûr("l'enseigne", rendEnseigne);
    sûr("la navigation", marqueNav);
    sûr("l'image croisée", rendCroisement);
    sûr("le manifeste", rendManifeste);
    sûr("le registre", rendRegistre);
    sûr("la fiche d'ouvrage", rendProjet);
    sûr("les pièces", rendPieces);
    sûr("la fiche de pièce", rendPieceSeule);
    sûr("les ateliers", rendAteliers);
    /* le pied de page est écrit en dur dans chaque page HTML : le script n'y touche plus */
    sûr("le formulaire", brancheFormulaire);
  });
})();
