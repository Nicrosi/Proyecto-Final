const { Router } = require("express");
const router = Router();
const {
  Round,
  User,
  Inscription,
  Team,
  Match,
  Subtournament,
} = require("../db");

router.post("/firstround/:id_subt", async (req, res) => {
  const { id_subt } = req.params;
  //busco equipos, con sus usuarios y con las inscripciones de los usuarios, con la condicion de que el id_subt en Inscription sea igual a la que llega por params
  try {
    let array_match = [];
    let subt_teams = await Team.findAll({
      where: {
        id_subt: id_subt,
      },
      attributes: ["id_team"],
      include: {
        model: User,
        attributes: ["name"],
        include: {
          model: Inscription,
          attributes: ["id_user"],
          where: {
            id_subt: id_subt,
          },
        },
      },
    });
    //filtro la consulta de sequelize anterior, quitando los teams que llegan con usuarios vacios, es decir los que no pertenecen al subtorneo correcto
    let filteredTeams = subt_teams.filter((s) => s.dataValues.users.length > 0);
    //genero un round y le pongo id en 1 por default, ya que esta ruta solo se utiliza para el primero
    let new_round = await Round.create({
      round_numb: 1,
      id_subt: id_subt,
    });
    //actualizo el atributo initialized the subtournament a true
    await Subtournament.update(
      { initialized: true },
      {
        where: {
          id_subt: id_subt,
        },
      }
    );
    //creo un objeto generico de matches con el id del round creado anteriormente
    let matches = {
      score: "[[0,0,0],[0,0,0]]",
      id_round: new_round.dataValues.id_round,
    };
    //utilizando map, tomo las ids de teams desde el filtro creado anteriormente
    let id_teams = filteredTeams.map((x) => x.dataValues.id_team);
    //divido la cantidad de teams entre 2 y pusheo el resultado en cantidad de matches a un array
    for (i = 0; i < id_teams.length / 2; i++) {
      array_match.push(matches);
    }
    //creo matches con el metodo bulkCreate pasandole como parametro el array que contiene la cantidad de matches correspondiente
    let new_match = await Match.bulkCreate(array_match);
    let team_pairs = [];
    //recorro el largo de los teams y me guardo en un array nuevo los teams en pares para asociarlos a las matches
    for (i = 0; i < id_teams.length; i++) {
      if (i % 2 === 0) {
        team_pairs.push([id_teams[i], id_teams[i + 1]]);
      }
    }
    //recorro el largo de las matches creadas anteriormente y las asocio con cada par de teams correspondiente
    for (i = 0; i < new_match.length; i++) {
      new_match[i].addTeam(team_pairs[i][0]);
      new_match[i].addTeam(team_pairs[i][1]);
    }
    res.send("Round created successfully");
  } catch (error) {
    console.log(error);
  }
});

router.post("/nextround/:id_subt", async (req, res) => {
  const { id_subt } = req.params;
  let array_match = [];
  let { round_numb, winners } = req.body;
  const team_pairs = [];
  try {
    /* if (winners.length === 1) {
      res.send("The winner is" + winners[0]);
    } else { */
    //creo un round con el id que llega por body
    let next_round = await Round.create({
      round_numb: round_numb,
      id_subt: id_subt,
    });
    let matches = {
      score: "[[0,0,0],[0,0,0]]",
      id_round: next_round.dataValues.id_round,
    };
    //tomo las ids de teams desde el array winner que llega por body
    for (i = 0; i < winners.length / 2; i++) {
      array_match.push(matches);
    }
    let new_match = await Match.bulkCreate(array_match);
    for (i = 0; i < winners.length; i++) {
      if (i % 2 === 0) {
        team_pairs.push([winners[i], winners[i + 1]]);
      }
    }
    for (i = 0; i < new_match.length; i++) {
      new_match[i].addTeam(team_pairs[i][0]);
      new_match[i].addTeam(team_pairs[i][1]);
    }
    res.send("Round created successfully");
  } catch (error) {
    /* } */ console.log(error);
  }
});

module.exports = router;
