const { Inscription,Subtournament,User,Tournament } = require("../db");
const getIscription = async (id) => {
  if (id) {
    const dbInscriptionId = await Inscription.findAll({
      where: {
        id_inscription: id,
   },include: [
        Subtournament,
        User,
        Tournament,
      ]
  });
    return dbInscriptionId;
  } else {
    const dbInscription = await Inscription.findAll({include: [
      Subtournament,
      User,
      Tournament,
    ]
});
    return dbInscription;
  }
};

module.exports = { getIscription };
