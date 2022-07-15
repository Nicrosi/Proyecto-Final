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
<<<<<<< HEAD

    let { dni } = req.params;
    let {
        previous_tournaments,
        hit_knowledge,
        other_strokes,
        special_hits,
        kick_serve_control,
        game_strategy,
    } = req.body;
    try {
        let newScore = await Score.create({
            previous_tournaments,
            hit_knowledge,
            other_strokes,
            special_hits,
            kick_serve_control,
            game_strategy,
        });

        let id = newScore.dataValues.id_score;


        let user = await User.findAll();
        user.forEach(async (el) => {
            if (el.dataValues.dni == dni) {
                await User.update(
                    {
                        id_score: id,
                    },
                    {
                        where: {
                            dni: el.dataValues.dni,
                        },
                    }
                );
            }
        });
        category();
        res.status(200).send("Sent!");
    } catch (err) {
        console.log(err);
    }
=======
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
>>>>>>> d41fdfb490ff8962559dc9b07fe2a1232a64f8f9
});

module.exports = router;
