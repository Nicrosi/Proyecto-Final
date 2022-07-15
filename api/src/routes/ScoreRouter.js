const { Router } = require("express");
const router = Router();
const { Score, User } = require("../db");
const { get_ScoreUser } = require("../utils/Score_Controller");
const { category } = require("../utils/Category_Controllers.js");

router.get("/", async (req, res) => {
  let { id_score } = req.query;
  if (id_score) {
    let score = await get_ScoreUser(id_score);
    score.length > 0
      ? res.status(200).send(score)
      : res.status(404).send("Score doesn't exist!");
  }
});

router.post("/:dni", async (req, res) => {
  const { dni } = req.params;
  const {
    previous_tournaments,
    hit_knowledge,
    other_strokes,
    special_hits,
    kick_serve_control,
    game_strategy,
  } = req.body;
  try {
    const newScore = await Score.create({
      previous_tournaments,
      hit_knowledge,
      other_strokes,
      special_hits,
      kick_serve_control,
      game_strategy,
    });
    const id = newScore.dataValues.id_score;
    await User.update(
      {
        id_score: id,
      },
      {
        where: {
          dni: dni,
        },
      }
    );
    category(id);
    res.status(200).send("Sent!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
