const { Router } = require("express");
const router = Router();
const { Match, Inscription, User, Team, Round } = require("../db");

router.get('/:id_subt', async (req, res) => {
    const {id_subt} = req.params;
    let matches = await Match.findAll({
        attributes: ['id_match', 'id_round', 'score'],
        include: [{
            through: {attributes: []},
            model: Team,
            attributes: ['id_team'],
            include: {
                through: {attributes: []},
                model: User,
                attributes: ['name'],
                    include: {
                        model: Inscription,
                        attributes: [],
                        where: {
                            id_subt: id_subt
                        }                            
                    }
            }
        },
        {
            model: Round,
            attributes: ['round_numb']
        }]
    })
    let filteredMatches = matches.filter(s => s.dataValues.teams.length > 0);
    res.send(filteredMatches)
})

module.exports = router;