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

router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.query;
  const is_payed = true;
  try {
    await Inscription.create({
      amount,
      is_payed : is_payed,
      id_user: id,
    });
    res.status(200).send("Inscription created!");    
  } catch (error) {
    next(error);
  }
});
module.exports = router;
