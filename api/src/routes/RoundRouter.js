const { Router } = require("express");
const router = Router();
const { Round, User, Inscription, Team, Match, Subtournament } = require("../db");


router.post('/firstround/:id_subt', async (req, res) => {
    const {id_subt} = req.params;
    try {
        let array_match = [];
        let subt_teams = await Team.findAll({
            attributes: ['id_team'],
            include: {
                model: User,
                attributes: ['name'],
                include: {
                    model: Inscription,
                    attributes: ['id_user'],
                    where: {
                        id_subt: id_subt
                    }
                }
            }
        });
    let filteredTeams = subt_teams.filter(s => s.dataValues.users.length > 0)
    let new_round = await Round.create({
        round_numb: 1,
        id_subt: id_subt
    });
    await Subtournament.update({ 
        initialized: true,
        where: {
            id_subt: id_subt
        }
    });
    let matches = {
        score: '[[0,0,0],[0,0,0]]',
        id_round: new_round.dataValues.id_round
    }
    let id_teams = filteredTeams.map(x => x.dataValues.id_team);  
    for(i=0; i < id_teams.length / 2; i++){
            array_match.push(matches);
    }
    let new_match = await Match.bulkCreate(array_match);
    let team_pairs = [];
    for(i=0; i < id_teams.length; i++){
        if(i % 2 === 0){
            team_pairs.push([id_teams[i], id_teams[i+1]])
        }
    }
    for(i=0; i < new_match.length; i++){
        new_match[i].addTeam(team_pairs[i][0]);
        new_match[i].addTeam(team_pairs[i][1]);
    }
    res.send('Round created successfully');
    } catch (error) {
        console.log(error);
    }    
})

// router.post('/nextround/:id_subt', async (req, res) => {
//     let {id_subt} = req.params;
//     let {
//         round_numb,
//     } = req.body
//     try {
//         await Round.create({
//             round_numb,
//             id_subt
//         })
//         res.send('Round created successfully').status(200);
//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router;