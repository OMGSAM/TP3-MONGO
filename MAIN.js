 
// 1. Sportifs entre 18 et 32 ans (identifiant, nom, prénom)
db.Sportifs.find(
  { age: { $gte: 18, $lte: 32 } },
  { _id: 0, identifiant: 1, nom: 1, prénom: 1 }
);

// 2. Salles de Marrakech ou Casablanca avec une surface > 300 m²
db.Salles.find(
  { ville: { $in: ["Marrakech", "Casa"] }, surface: { $gt: 300 } }
);

// 3. Sportifs qui pratiquent le football
db.Sportifs.find(
  { type_sport: "football" },
  { _id: 0, identifiant: 1, nom: 1 }
);

// 4. Salles et jours avec des séances de football
db.Salles.find(
  { seance: "football" },
  { _id: 0, id_S: 1, ville: 1, jour: 1 }
);

// 5. Salles pour jouer au hockey le mercredi après 17h
db.Salles.find(
  { seance: "hockey", jour: "mercredi", heure: { $gt: 17 } },
  { _id: 0, id_S: 1, ville: 1 }
);

// 6. Sportifs ne pratiquant aucun sport
db.Sportifs.find(
  { type_sport: { $exists: false } },
  { _id: 0, identifiant: 1, nom: 1 }
);

// 7. Salles sans séances le dimanche
db.Salles.find(
  { jour: { $ne: "dimanche" } },
  { _id: 0, id_S: 1, ville: 1 }
);

// 8. Salles proposant uniquement du basketball ou volleyball
db.Salles.find(
  { seance: { $in: ["basketball", "volleyball"] } },
  { _id: 0, id_S: 1, ville: 1 }
);

// 9. Sportifs qui sont conseillers
db.Sportifs.find(
  { type_sportif: "conseiller" },
  { _id: 0, identifiant: 1, nom: 1 }
);

// 10. Conseiller du sportif "ALI"
db.Sportifs.aggregate([
  { $match: { prénom: "ALI" } },
  { $lookup: {
      from: "Salles",
      localField: "identifiant",
      foreignField: "identifiant",
      as: "details_conseiller"
  } },
  { $project: { "details_conseiller.Nom_conseiller": 1 } }
]);
"""

 
