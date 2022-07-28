const { Router } = require("express");
const router = Router();
const {
  Subtournament,
  Category,
  Tournament,
  Inscription,
  Op,
} = require("../db");
const { getAllSubt } = require("../utils/Subt_Controller");

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const subtournament = await Subtournament.findAll({
      where: { name: { [Op.iLike]: `${name}%` } },
      include: [Tournament, Category],
    });
    const subTourn = {
      name: "subtournament",
      value: subtournament,
    };
    subtournament.length
      ? res.status(200).json(subTourn)
      : res.status(400).send("Subtournament not found!");
  } else {
    let allSubt = await getAllSubt();
    allSubt.length > 0
      ? res.status(200).send(allSubt)
      : res.status(404).send("No sub tournament found");
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let subt_id = await getAllSubt(id);
  subt_id.length > 0
    ? res.status(200).send(subt_id)
    : res.status(404).send("No sub tournament found");
});

router.get("/ByTournament/:id_tournament", async (req, res) => {
  let { id_tournament } = req.params;
  let filter_subt = await Subtournament.findAll({
    where: {
      id_tournament: id_tournament,
    },
    include: [Category, Tournament, Inscription],
  });
  filter_subt.length > 0
    ? res.status(200).send(filter_subt)
    : res.status(404).json({ msg_error: "Subtournament not found" });
});

router.post("/:id_tournament", async (req, res) => {
  let {
    elimination_type,
    match_type,
    name,
    numb_players,
    gender,
    price,
    id_category,
  } = req.body;

  const tournament = req.params;

  try {
    const newSubtournament = await Subtournament.create({
      elimination_type,
      match_type,
      name,
      numb_players,
      gender,
      price,
      id_tournament: tournament.id_tournament,
      id_category,
    });
    newSubtournament ? res.status(200).send(`Subtournament created!`) : res.status(400).send(`Subtournament not created!`)
    
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    elimination_type,
    match_type,
    name,
    numb_players,
    gender,
    price,
    id_category,
  } = req.body;
  try {
    const newCategory = await Category.findOne({
      where: { id_category: parseInt(id_category) },
    });

    await Subtournament.update(
      {
        elimination_type,
        match_type,
        name,
        numb_players,
        gender,
        price,
        id_category: newCategory.id_category,
      },
      {
        where: {
          id_subt: id,
        },
      }
    );

    res.status(200).send("Sub tournament has been updated!");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id_subtournament", async (req, res) => {
  const { id_subtournament } = req.params;
  const subtournament = await Subtournament.destroy({
    where: { id_subt: id_subtournament },
  });
  subtournament === 1
    ? res.status(200).send({ msg: "Subtournament deleted successfully" })
    : res.status(400).send({ msg: "Subtournament not found" });
});

module.exports = router;
