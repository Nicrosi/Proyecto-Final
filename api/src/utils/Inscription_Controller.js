const { Inscription } = require("../db");
const getIscription = async (id) => {
  if (id) {
    const dbInscriptionId = await Inscription.findAll({
      where: {
        id_inscription: id,
      },
    });
    return dbInscriptionId;
  } else {
    const dbInscription = await Inscription.findAll();
    return dbInscription;
  }
};

module.exports = { getIscription };
