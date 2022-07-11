const { Router } = require("express");
const router = Router();
const { Inscription } = require("../db");
const { getIscription } = require("../utils/Inscription_Controller");

router.get("/", async (req, res, next) => {
  const { id_inscription } = req.query;
  try {
    if (id_inscription) {
      const allInscription = await getIscription(id_inscription);
      allInscription.length > 0
        ? res.json(allInscription)
        : res.status(400).send("the inscription was not found");
    } else {
      const allInscription = await getIscription();
      res.json(allInscription);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:dni", async (req, res, next) => {
  const { dni } = req.params;
  const { amount, is_payed } = req.body;
  try {
    const inscription = await Inscription.create({
      amount,
      is_payed,
      is_user: dni,
    });

    res.send("Inscription created!");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
