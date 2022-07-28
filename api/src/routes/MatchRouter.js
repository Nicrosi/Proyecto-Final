const { Router } = require("express");
const router = Router();
const { Match, Inscription, User, Team, Round , Subtournament} = require("../db");

router.get("/:id_subt", async (req, res) => {
  const { id_subt } = req.params;
  try {
    let matches = await Match.findAll({
      attributes: ["id_match", "id_round", "score"],
      include: [
        {
          through: { attributes: [] },
          model: Team,
          attributes: ["id_team"],
          include: {
            through: { attributes: [] },
            model: User,
            attributes: ["name"],
            include: {
              model: Inscription,
              attributes: [],
              where: {
                id_subt: id_subt,
              },
            },
          },
        },
        {
          model: Round,
          attributes: ["round_numb"],
          include: {
            model: Subtournament,
            attributes: ["id_subt"],
          }
        },
      ],
    });
    let filteredMatches = matches.filter((s) => s.dataValues.teams.length > 0 && s.dataValues.round.subtournament.id_subt === id_subt);
    filteredMatches.sort((a, b) => a.round.round_numb > b.round.round_numb ? 1 : -1);
    res.send(filteredMatches);
  } catch (error) {
    console.log(error);
  }

  router.put("/putscore/:id_match", async (req, res) => {
    const { id_match } = req.params;
    let { score } = req.body;

    try {
      await Match.update(
        { score: score },
        {
          where: {
            id_match: id_match,
          },
        }
      );
      res.send("okey");
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
